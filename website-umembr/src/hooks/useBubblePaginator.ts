import { paginateMemoryAction } from "@/store/actions";
import { homeSelector } from "@/store/selectors";
import { debounce, ExtractCallbackType } from "@/utils";
import positionItems from "@/utils/bubblePositioning";
import { PositionedContainer, PositionedItem } from "@/utils/bubblePositioning/interfaces";
import { Theme, useMediaQuery } from "@mui/material";
import { useEffect, useMemo, useRef, useState } from "react";
import { useSelector } from "react-redux";
import useAwaitableSagaAction from "./useAwaitableSagaAction";

/**
 * Calculates the pagination limit based on the screen size
 */
function getInitialPaginationState(storyId?: string, circleDiameter?: number, adjustmentFactor: number = 3) {
  let calculatedLimit = 10;
  if (circleDiameter) {
    const adjustedCircleArea = circleDiameter ** 2 * adjustmentFactor; // Rough area calculation is fine here
    calculatedLimit = Math.ceil(window.innerWidth * window.innerHeight / adjustedCircleArea);
  }
  return {
    storyId: storyId ?? '',
    page: 0,
    limit: calculatedLimit,
    totalPages: 0,
    totalMemories: 0,
  }
}

const initialPaginationState: Omit<ExtractCallbackType<typeof paginateMemoryAction>, 'data'> & Record<'storyId', string> = getInitialPaginationState();

const initialContainerInfo: Pick<ReturnType<typeof positionItems>, 'itemsInLastSubcontainer' | 'lastSubcontainer'> = {
  itemsInLastSubcontainer: [],
  lastSubcontainer: {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
  }
}

const margin = 20; // Margen entre círculos y el rectángulo
const rectangleWidth = 23.75 * 16;
const rectangleHeight = 25.75 * 16;
const MAX_ATTEMPTS = 10000;

function useBubblePaginator(storyId: string, story: any, user: any, confirmPassword: any) {
  const { dispatchAction } = useAwaitableSagaAction(paginateMemoryAction);
  const isMobile = useMediaQuery((theme: Theme) => theme.breakpoints.down('md'));
  const [mergedData, setMergedData] = useState<PositionedItem<{ [key: string]: unknown }>[]>([]);
  const [contentContainerHeight, setContentContainerHeight] = useState<number>();

  const homeData = useSelector(homeSelector);

  const { boxMargin, circleDiameter, calculateContainers } = useMemo(() => {
    const circleDiameter = isMobile ? 140 : 160;
    const boxMargin = isMobile ? '5rem' : '8rem';
    const calculateContainers = () => {
      const startingContainer: PositionedContainer = {
        x: margin,
        y: 0,
        width: window ? window.innerWidth - 2 * margin : 0,
        height: circleDiameter * 2,
      };
      const forbiddenArea: PositionedContainer | undefined = !isMobile
        ? {
          x: startingContainer.width / 2 - rectangleWidth / 2,
          y: window.innerHeight / 2 - rectangleHeight / 2 - 128,
          width: rectangleWidth,
          height: rectangleHeight,
        }
        : undefined;
      const positioningOpts = {
        targetDensity: 0.25,
        circleDiameter,
        margin,
        maxAttempts: MAX_ATTEMPTS,
      };
      return {
        startingContainer,
        forbiddenArea,
        positioningOpts,
      };
    }
    return {
      boxMargin,
      circleDiameter,
      calculateContainers,
    };
  }, [isMobile]);

  // Helper states for pagination
  const apiStates = useRef(getInitialPaginationState(storyId, circleDiameter));
  const drawParams = useRef(calculateContainers());
  const pagePositioningStates = useRef({ ...initialContainerInfo, lastSubcontainer: drawParams.current.startingContainer });
  // Used for redrawing without causing render loops or extra dependencies
  const positionsRef = useRef<typeof mergedData>([]);

  const stabilizedCriterias = useMemo(() => homeData?.criterias,
    // eslint-disable-next-line react-hooks/exhaustive-deps --  cache the criterias so the instance only changes if the data itself changes. better selectors would clean up this dependency array and make this cache unnecessary
    [
      homeData?.criterias?.search,
      homeData?.criterias?.types?.length,
      homeData?.criterias?.prompts?.length,
      homeData?.criterias?.collaborators?.length
    ])

  const { draw, redraw } = useMemo(() => {
    const draw = (data: ReturnType<typeof positionItems>, overrideData?: boolean,) => {
      const {
        itemsInLastSubcontainer,
        lastSubcontainer,
        positions,
      } = data
      pagePositioningStates.current = {
        itemsInLastSubcontainer,
        lastSubcontainer
      };
      const lastBubble = positions[data.positions.length - 1];
      if (lastBubble) setContentContainerHeight(lastBubble.y + drawParams.current.positioningOpts.circleDiameter + margin);
      if (overrideData) {
        // Make sure its the same object reference
        setMergedData(positions);
        positionsRef.current = positions
      } else {
        setMergedData(oldData => {
          // Make sure its the same object reference
          const newMergedData = [...oldData, ...positions]
          positionsRef.current = newMergedData;
          return newMergedData;
        });
      }
    }

    const redraw = debounce((newStartingContainer: PositionedContainer, newPositionerOpts: Parameters<typeof positionItems>[3], newForbiddenArea?: PositionedContainer) => {
      pagePositioningStates.current = { itemsInLastSubcontainer: [], lastSubcontainer: newStartingContainer };
      const positioningResult = positionItems(pagePositioningStates.current.itemsInLastSubcontainer, positionsRef.current, newStartingContainer, newPositionerOpts, newForbiddenArea);
      draw(positioningResult, true)
    }, 200)
    return { draw, redraw }
  }, [])



  const ownerShip = story?.user_id === user?.id;
  const collaborator = story?.roleUsers?.find((role: any) => role.user_id === user?.id);

  const { next, reset } = useMemo(() => {
    // To remove state dependency on renderable 'busy' state
    let dispatchBusy = false;
    const next = async (pageOverride?: number, limitOverride?: number) => {
      if (dispatchBusy) {
        return;
      }
      if (apiStates.current.page >= apiStates.current.totalPages && apiStates.current.totalPages > 0) {
        return;
      }
      if ((!ownerShip && !collaborator) && (!confirmPassword && story?.private)) {
        return;
      }

      if (!storyId) return

      dispatchBusy = true
      const result = await dispatchAction({
        criterias: stabilizedCriterias,
        storyId,
        page: pageOverride ?? apiStates.current.page + 1,
        limit: limitOverride ?? apiStates.current.limit
      }).finally(() => dispatchBusy = false);
      const { ok, message, data } = result;
      if (!ok || !data) {
        console.log(`Error paginating story ${storyId}. Reason: "${!data ? 'No data' : message}"`);
        return;
      }

      const { data: pageItems, ...paginationState } = data;

      apiStates.current = { ...apiStates.current, ...paginationState }

      const positioningResult = positionItems(pagePositioningStates.current.itemsInLastSubcontainer, pageItems, pagePositioningStates.current.lastSubcontainer, drawParams.current.positioningOpts, drawParams.current.forbiddenArea);

      draw(positioningResult);
    }

    const reset = (container: PositionedContainer = drawParams.current.startingContainer) => {
      if (dispatchBusy) return;
      apiStates.current = getInitialPaginationState(storyId, circleDiameter);
      pagePositioningStates.current = { ...initialContainerInfo, lastSubcontainer: container };
      setMergedData([]);
      next(apiStates.current.page, apiStates.current.limit);
    }

    return {
      next,
      reset,
    }
  }, [circleDiameter, dispatchAction, draw, stabilizedCriterias, storyId, user?.id, confirmPassword])

  useEffect(() => {
    const handleResize = () => {
      drawParams.current = calculateContainers();
      const { startingContainer, forbiddenArea, positioningOpts } = drawParams.current;
      redraw(startingContainer, positioningOpts, forbiddenArea);
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [calculateContainers, redraw]);

  useEffect(() => {
    if (storyId && storyId !== apiStates.current.storyId) {
      apiStates.current = { ...initialPaginationState, storyId };
      reset();
    }
    if ((!ownerShip && !collaborator) && (!confirmPassword && story?.private)) {
      apiStates.current = { ...initialPaginationState, storyId };
      reset();
      return;
    }
  }, [reset, storyId, user?.id, confirmPassword])
  useEffect(() => {
    reset();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- only want to run this when criterias change
  }, [stabilizedCriterias])


  return { mergedData, contentContainerHeight, boxMargin, circleDiameter, next, setMergedData, mergedDataRef: positionsRef };
}

export default useBubblePaginator;
