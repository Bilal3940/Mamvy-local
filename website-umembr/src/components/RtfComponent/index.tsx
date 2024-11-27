import { createElement, FC, Fragment } from "react";

const RtfComponent: FC<any> = ({ rtf, label, style }) => {
  return (typeof rtf?.value !== 'string' && rtf) ? (
    <div className={style}>
      {rtf.map((paragraph: any, index: number) => (
        <Fragment key={index}>
          {createElement(
            label,
            { style: { minHeight: "24px" } },
            paragraph?.children?.map((child: any, childIndex: number) => {
              const text = child?.text;
              const childStyle: React.CSSProperties = {
                fontFamily: 'DM Sans, sans-serif'
              };

              if (child?.italic) childStyle.fontStyle = 'italic';
              if (child?.underline) childStyle.textDecoration = 'underline';
              if (child?.bold) childStyle.fontWeight = 'bold';
              return (
                <span key={childIndex} style={childStyle}>
                  {text}
                </span>
              );
            })
          )}
        </Fragment>
      ))}
    </div>
  ) : null;
};

export default RtfComponent;
