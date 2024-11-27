import { FC, useMemo } from 'react';
import InfoRender from './InfoRender';

const InfoContent: FC<any> = ({ data }: any) => {
  const titles = useMemo(() => {
    return Object.keys(data || {});
  }, [data]);
  return (
    <>
      {titles.map((title: any) => (
        <InfoRender key={title} title={title} data={data[title]} />
      ))}
    </>
  );
};

export default InfoContent;
