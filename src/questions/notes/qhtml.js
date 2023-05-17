function renderWaterfall(rootNode, columnCount, elementGap) {
    const children = Array.from(rootNode.children);
    const rootWidth = rootNode.getBoundingClientRect().width;
    const columnWidth = (rootWidth - elementGap * (columnCount - 1)) / columnCount;
    const columnHeights = Array(columnCount).fill(0);
    const columnPositions = Array(columnCount).fill(0).map((_, i) => i * (columnWidth + elementGap));

    rootNode.style.position = 'relative';
    children.forEach(child => {
        const columnIndex = columnHeights.indexOf(Math.min(...columnHeights));
        child.style.position = 'absolute';
        child.style.width = `${columnWidth}px`;
        child.style.left = `${columnPositions[columnIndex]}px`;
        child.style.top = `${columnHeights[columnIndex]}px`;
        
        columnHeights[columnIndex] += child.getBoundingClientRect().height + elementGap;
    });
    rootNode.style.height = `${Math.max(...columnHeights)}px`;
}
