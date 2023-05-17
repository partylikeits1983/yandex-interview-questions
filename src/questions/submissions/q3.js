function renderWaterfall(rootNode, columnCount, elementGap) {
    const elements = Array.from(rootNode.getElementsByClassName('el'));
  
    const columns = Array.from({ length: columnCount }, () => []);
  
    elements.forEach((element) => {
      const shortestColumn = columns.reduce(
        (minColumn, column) => (column.offsetHeight < minColumn.offsetHeight ? column : minColumn),
        columns[0]
      );
  
      shortestColumn.push(element);
    });
  
    rootNode.innerHTML = '';
  
    columns.forEach((column, columnIndex) => {
      const columnContainer = document.createElement('div');
      columnContainer.className = 'column';
  
      column.forEach((element, elementIndex) => {
        columnContainer.appendChild(element);
  
        if (elementIndex < column.length - 1) {
          const gap = document.createElement('div');
          gap.style.height = `${elementGap}px`;
          columnContainer.appendChild(gap);
        }
      });
  
      const columnWidth = `${100 / columnCount}%`;
      columnContainer.style.width = columnWidth;
  
      rootNode.appendChild(columnContainer);
    });
  }