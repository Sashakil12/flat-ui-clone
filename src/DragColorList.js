import React from "react";
import DragColorBox from "./DrgColorBox";
import { SortableContainer } from "react-sortable-hoc";

const DragColorList = SortableContainer(({ colors, handleDelete }) => {
  return (
    <div style={{ height: "100%" }}>
      {colors.map((col, i) => (
        <DragColorBox
          index={i}
          key={`${col.color}-${Math.random() * 5}`}
          {...col}
          handleDelete={handleDelete}
        />
      ))}
    </div>
  );
});

export default DragColorList;
