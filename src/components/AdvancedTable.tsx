import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@linaria/react';
import { generateTableJson } from './common.ts';
import { css } from '@linaria/core';
import { CgMoreR } from '@react-icons/all-files/cg/CgMoreR';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import Menu from '../../../../../../@shared/components/atoms/Munu/Menu.tsx';

//! 데이터 구조 변경전

function AdvancedTable() {
  const [tableHeight, setTableHeight] = useState('auto');
  const [tableWidth, setTableWidth] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);

  const [columnDecorations, setColumnDecorations] = useState(
    generateTableJson(['1', '2', '3'], 'column')
  );
  const [rowDecorations, setRowDecorations] = useState(generateTableJson(['1', '2'], 'row'));
  const columnDecoratorsRef = useRef(columnDecorations.map(() => createRef()));
  const rowDecoratorsRef = useRef(rowDecorations.map(() => createRef()));
  const [isVisibleMenu, setIsVisibleMenu] = useState(false);
  const [tableData, setTableData] = useState([
    {
      cells: [
        {
          id: uuidv4(),
          value: 'Name',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
        {
          id: uuidv4(),
          value: 'Age',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
        {
          id: uuidv4(),
          value: 'City',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
      ],
    },
    {
      cells: [
        {
          id: uuidv4(),
          value: 'John Do',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
        {
          id: uuidv4(),
          value: 'Doe',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
        {
          id: uuidv4(),
          value: 'New York',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
        },
      ],
    },
  ]);

  const decorationColumnOptions = useMemo(
    () => [
      {
        id: '101',
        type: 'column',
        action: 'add',
        name: 'Add column on the Left',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="currentColor"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              transform="matrix(0 -1 1 0 0 24)"
              fill="none"
              // fill-opacity="0.01"
            ></rect>
            <rect
              x="12"
              y="18"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-90 12 18)"
              fill="currentColor"
            ></rect>
            <rect
              x="16"
              y="18"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-90 16 18)"
              fill="currentColor"
            ></rect>
            <path
              // fill-rule="evenodd"
              // clip-rule="evenodd"
              d="M7 11H5.99C5.72652 11.0026 5.47473 11.1092 5.28935 11.2964C5.10397 11.4837 4.99999 11.7365 5 12C5 12.556 5.444 13 5.99 13H7V14C7 14.2652 7.10536 14.5196 7.29289 14.7071C7.48043 14.8946 7.73478 15 8 15C8.26522 15 8.51957 14.8946 8.70711 14.7071C8.89464 14.5196 9 14.2652 9 14V13H10.01C10.2735 12.9974 10.5253 12.8908 10.7107 12.7036C10.896 12.5163 11 12.2635 11 12C11 11.444 10.556 11 10.01 11H9V10C9 9.73478 8.89464 9.48043 8.70711 9.29289C8.51957 9.10536 8.26522 9 8 9C7.73478 9 7.48043 9.10536 7.29289 9.29289C7.10536 9.48043 7 9.73478 7 10V11Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      },
      {
        id: '102',
        type: 'column',
        action: 'add',
        name: 'Add column on the Right',
        icon: (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              width="24"
              height="24"
              transform="translate(0 24) rotate(-90)"
              fill="none"
              // fill-opacity="0.01"
            ></rect>
            <rect
              x="9"
              y="18"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-90 9 18)"
              fill="currentColor"
            ></rect>
            <rect
              x="5"
              y="18"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-90 5 18)"
              fill="currentColor"
            ></rect>
            <path
              // fill-rule="evenodd"
              // clip-rule="evenodd"
              d="M15 11L13.99 11C13.7265 11.0026 13.4747 11.1092 13.2893 11.2964C13.104 11.4837 13 11.7365 13 12C13 12.556 13.444 13 13.99 13L15 13L15 14C15 14.2652 15.1054 14.5196 15.2929 14.7071C15.4804 14.8946 15.7348 15 16 15C16.2652 15 16.5196 14.8946 16.7071 14.7071C16.8946 14.5196 17 14.2652 17 14L17 13L18.01 13C18.2735 12.9974 18.5253 12.8908 18.7107 12.7036C18.896 12.5163 19 12.2635 19 12C19 11.444 18.556 11 18.01 11L17 11L17 10C17 9.73478 16.8946 9.48043 16.7071 9.29289C16.5196 9.10536 16.2652 9 16 9C15.7348 9 15.4804 9.10536 15.2929 9.29289C15.1054 9.48043 15 9.73478 15 10L15 11Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      },
      {
        id: '103',
        type: 'column',
        action: 'distribute',
        name: 'Distribute columns equally',
        icon: <FaTrash />,
      },
      {
        id: '104',
        type: 'column',
        action: 'remove',
        name: 'Remove selected column',
        icon: <FaTrash />,
      },
    ],
    []
  );

  console.log('tableData ', tableData);
  console.log('columnDecorators ', columnDecorations);

  const [selectedCell, setSelectedCell] = useState(null);

  const contentTableRef = useRef(null);
  const handleCellClick = (rowIndex, columnIndex) => {
    console.log('cell click');
    setSelectedCell({ rowIndex, columnIndex });
  };

  useEffect(() => {
    console.log('tableElement.current.offsetHeight ', contentTableRef.current.offsetHeight);
    setTableHeight(contentTableRef.current.offsetHeight);
    setTableWidth(contentTableRef.current.offsetWidth);
  }, []);

  const handleResizerDown = (e, index) => {
    if (e.target.dataset.name === e.currentTarget.dataset.name) {
      console.log('handleResizerDown ', e.target);
      console.log('handleResizerDown ', index);
      setActiveIndex(index);
    }
  };

  //! ==========
  const mouseMove = useCallback(
    (e) => {
      console.log('mouse move activeIndex', activeIndex);
      console.log('mouse move columnDecoratorsRef', columnDecoratorsRef);
      console.log(columnDecoratorsRef.current[activeIndex].current.getBoundingClientRect());
      console.log('current width ', columnDecoratorsRef.current[activeIndex].current.style.width);

      const selectedColumnRef = columnDecoratorsRef.current[activeIndex].current;
      /*const width =
        e.clientX - columnDecoratorsRef.current[activeIndex].current.getBoundingClientRect().x;*/
      const width = e.clientX - selectedColumnRef.getBoundingClientRect().x;

      columnDecoratorsRef.current.forEach((columnRef) => {
        console.log(
          '👉🏼AdvancedTable/ :234 - << james >> resize column   = ',
          columnRef.current.style.width
        );
      });
      columnDecoratorsRef.current[activeIndex].current.style.width = `${width}px`;

      setColumnDecorations((prevState) => {
        return prevState.map((column, idx) => {
          if (idx === activeIndex) {
            return {
              ...column,
              width,
            };
          }
          return column;
        });
      });
    },
    [activeIndex]
  );

  const removeListeners = useCallback(() => {
    window.removeEventListener('mousemove', mouseMove);
    window.removeEventListener('mouseup', removeListeners);
  }, [mouseMove]);

  const mouseUp = useCallback(() => {
    setActiveIndex(null);
    removeListeners();
  }, [setActiveIndex, removeListeners]);

  useEffect(() => {
    if (activeIndex !== null) {
      window.addEventListener('mousemove', mouseMove);
      window.addEventListener('mouseup', mouseUp);
    }

    return () => {
      removeListeners();
    };
  }, [activeIndex, mouseMove, mouseUp, removeListeners]);

  const handleColumnMenuChange = (item, columnIndex, columnId) => {
    console.log('columnDecoratorsRef ', columnDecoratorsRef);
    /*    const initDecorationColumnObj = {
      id: uuidv4(),
      value: '',
      rowSpan: 1,
      colSpan: 1,
      isSelected: false,
      text: '',
      width: 50,
    };
    const initTableDataObj = {
      id: uuidv4(),
      value: '',
      rowSpan: 1,
      colSpan: 1,
      isSelected: false,
      text: '',
      width: 50,
    };

    if (item.type === 'column') {
      if (item.action === 'add') {
        const indexToAdd = item.id === '101' ? 0 : 1;
        setColumnDecorations((prevState) => {
          const array = [...prevState];
          array.splice(columnIndex + indexToAdd, 0, initDecorationColumnObj);
          return array;
        });

        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            console.log('tableList ', tableList);
            const cells = [...row.cells];
            cells.splice(columnIndex + indexToAdd, 0, initTableDataObj);
            const newRow = { cells: cells };
            console.log('newRow ', newRow);
            return newRow;
          });
          console.log('newTableList ', newTableList);
          return newTableList;
        });

        columnDecoratorsRef.current.splice(columnIndex + indexToAdd, 0, createRef());
      }
      if (item.action === 'remove') {
        setColumnDecorations((prevState) => {
          const newColumns = prevState.filter((item, idx) => idx !== columnIndex);
          console.log('newColumns ', newColumns);
          return newColumns;
        });
        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = row.cells.filter((cell, cellIdx) => cellIdx !== columnIndex);
            // const newCells = cells.filter((cell, cellIdx) => cellIdx !== columnIndex);
            return { cells: cells };
          });
          console.log('newTableList ', newTableList);
          return newTableList;
        });
        columnDecoratorsRef.current.splice(columnIndex, 1);
        console.log('columnDecoratorsRef ', columnDecoratorsRef);
      }
      if (item.action === 'distribute') {
        /!**
         * 1. get each cell width
         * 2. columnDecorations, tableData width change
         * 3. table width change
         *!/
        const tableWidth = contentTableRef.current.offsetWidth;
        const columnCount = tableData[0].cells.length;
        const updatedColumnWidth = tableWidth / columnCount;

        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = row.cells.map((cell, cellIdx) => {
              return {
                ...cell,
                width: updatedColumnWidth,
              };
            });
            return { cells: cells };
          });
          return newTableList;
        });

        setColumnDecorations((prevState) => {
          const newColumnDecorations = prevState.map((column) => {
            return {
              ...column,
              width: updatedColumnWidth,
            };
          });
          return newColumnDecorations;
        });
        columnDecoratorsRef.current.forEach((columnRef) => {
          console.log(`columnRef = `, columnRef.current.style.width);
          columnRef.current.style.width = `${updatedColumnWidth}px`;
        });
        console.log(
          '👉🏼AdvancedTable/handleColumnMenuChange :377 - james >> columnDecoratorsRef.current  = ',
          columnDecoratorsRef.current[0].current.style.width
        );
      }
    }*/
  };

  const handleColumnMenuClick = (e, columnIndex, item) => {
    const initColumnDecorationObj = {
      id: uuidv4(),
      value: '',
      rowSpan: 1,
      colSpan: 1,
      isSelected: false,
      text: '',
      width: 50,
    };
    const initTableDataObj = {
      id: uuidv4(),
      value: '',
      rowSpan: 1,
      colSpan: 1,
      isSelected: false,
      text: '',
      width: 50,
    };

    if (item.type === 'column') {
      if (item.action === 'add') {
        const indexToAdd = item.id === '101' ? 0 : 1;
        setColumnDecorations((prevState) => {
          const array = [...prevState];
          array.splice(columnIndex + indexToAdd, 0, initColumnDecorationObj);
          console.log('👉🏼setColumnDecorations :413 - << james >> array  = ', array);
          return array;
        });

        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            console.log('tableList ', tableList);
            const cells = [...row.cells];
            cells.splice(columnIndex + indexToAdd, 0, initTableDataObj);
            const newRow = { cells: cells };
            console.log('newRow ', newRow);
            return newRow;
          });
          console.log('newTableList ', newTableList);
          return newTableList;
        });

        columnDecoratorsRef.current.forEach((columnRef) => {
          console.log('👉🏼Column Ref - << james >> = ', columnRef.current.style.width);
        });

        columnDecoratorsRef.current.splice(columnIndex + indexToAdd, 0, createRef());
      }
      if (item.action === 'remove') {
        setColumnDecorations((prevState) => {
          const newColumns = prevState.filter((item, idx) => idx !== columnIndex);
          console.log('newColumns ', newColumns);
          return newColumns;
        });
        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = row.cells.filter((cell, cellIdx) => cellIdx !== columnIndex);
            // const newCells = cells.filter((cell, cellIdx) => cellIdx !== columnIndex);
            return { cells: cells };
          });
          console.log('newTableList ', newTableList);
          return newTableList;
        });
        columnDecoratorsRef.current.splice(columnIndex, 1);
        console.log('columnDecoratorsRef ', columnDecoratorsRef);
      }
      if (item.action === 'distribute') {
        const tableWidth = contentTableRef.current.offsetWidth;
        const columnCount = tableData[0].cells.length;
        const updatedColumnWidth = tableWidth / columnCount;

        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = row.cells.map((cell, cellIdx) => {
              return {
                ...cell,
                width: updatedColumnWidth,
              };
            });
            return { cells: cells };
          });
          return newTableList;
        });

        setColumnDecorations((prevState) => {
          const newColumnDecorations = prevState.map((column) => {
            return {
              ...column,
              width: updatedColumnWidth,
            };
          });
          return newColumnDecorations;
        });
        columnDecoratorsRef.current.forEach((columnRef) => {
          console.log(`columnRef = `, columnRef.current.style.width);
          columnRef.current.style.width = `${updatedColumnWidth}px`;
        });
        console.log(
          '👉🏼AdvancedTable/handleColumnMenuChange :377 - james >> columnDecoratorsRef.current  = ',
          columnDecoratorsRef.current[0].current.style.width
        );
      }
    }
  };

  return (
    <StyledTableRootWrapper>
      {/*<StyledPinning>+</StyledPinning>*/}
      <StyledDecorationTable left={35}>
        <colgroup>
          {columnDecorations.map((item, idx) => (
            <StyledCol key={item.id} width={item.width} ref={columnDecoratorsRef.current[idx]} />
          ))}
        </colgroup>
        <tbody style={{ height: 20 }}>
          <tr>
            {columnDecorations.map((item, idx) => (
              <StyledDecoratorTd
                key={item.id}
                ref={columnDecoratorsRef.current[idx]}
                width={item.width}
                style={{
                  position: 'relative',
                  maxWidth: columnDecorations.filter((item, columnIndex) => idx === columnIndex)[0]
                    .width,
                  border: '1px solid',
                }}
              >
                <div className={columnControlWrapperClass}>
                  <div role={'menu-area'}>
                    <Menu
                      columnIndex={idx}
                      columnId={item.id}
                      width={'15'}
                      items={decorationColumnOptions}
                      onChange={handleColumnMenuChange}
                      onClick={handleColumnMenuClick}
                    >
                      <CgMoreR
                        className={columnControlIconClass}
                        data-idx={idx}
                        data-id={item.id}
                      />
                    </Menu>
                  </div>{' '}
                </div>
                {/*{item.text}*/}
              </StyledDecoratorTd>
            ))}
          </tr>
        </tbody>
      </StyledDecorationTable>
      <StyledDecorationTable top={35} style={{ width: 30 }}>
        <tbody>
          {rowDecorations.map((item, index) => (
            <StyledDecoratorTr
              key={item.id}
              ref={rowDecoratorsRef.current[index]}
              height={item.height}
            >
              <td>{item.text} </td>
            </StyledDecoratorTr>
          ))}
        </tbody>
      </StyledDecorationTable>
      <StyledTableContainer>
        <table ref={contentTableRef}>
          <colgroup>
            {columnDecorations.map((item, index) => (
              <StyledCol key={index} width={item.width} ref={columnDecoratorsRef.current[index]} />
            ))}
          </colgroup>
          <thead>
            <tr style={{ position: 'relative' }}>
              {tableData[0].cells.map((item, idx) => {
                return (
                  <th
                    key={item.id}
                    data-id={item.id}
                    data-index={idx}
                    style={{ position: 'relative', borderBottom: '1px solid #FFF00' }}
                  >
                    <StyledColumnResizeHandler
                      data-column-index={idx}
                      onMouseDown={(e) => handleResizerDown(e, idx)}
                      style={{ height: tableHeight }}
                    />
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {tableData.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                style={{ height: rowDecorations.filter((item, idx) => idx === rowIndex)[0].height }}
              >
                {row.cells.map((cell, columnIndex) => (
                  <td
                    // contentEditable="true"
                    key={cell.id}
                    onClick={() => handleCellClick(rowIndex + 1, columnIndex)}
                    style={{
                      border: '1px solid #dedede',
                      outline:
                        selectedCell?.rowIndex === rowIndex + 1 &&
                        selectedCell?.columnIndex === columnIndex
                          ? '1px solid #388bff'
                          : 'none',
                      outlineOffset: '-1px',
                      rowSpan: cell.rowSpan,
                      colSpan: cell.colSpan,
                      overflow: 'hidden',
                      whiteSpace: 'nowrap',
                      textOverflow: 'ellipsis',
                      width: columnDecorations.filter((item, idx) => idx === columnIndex)[0].width,
                      maxWidth: columnDecorations.filter((item, idx) => idx === columnIndex)[0]
                        .width,
                    }}
                  >
                    {cell.value !== null ? cell.value : ''}
                    {columnIndex === 0 && (
                      <StyledRowResizeHandler style={{ width: tableWidth }}>
                        <button
                          name={'rowResizer'}
                          onClick={(e) => {
                            console.log('resize click ', e.target.name);
                          }}
                        >
                          Re
                        </button>
                      </StyledRowResizeHandler>
                    )}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </StyledTableContainer>
    </StyledTableRootWrapper>
  );
}

const columnControlIconClass = css`
  position: relative;
  color: rgba(92, 111, 189, 0.64);
  background-color: rgba(255, 255, 255, 0.53);
  font-size: 1.8rem;
  cursor: pointer;

  &:hover {
    background-color: rgba(255, 255, 255, 0.77);
  }
`;

const columnControlWrapperClass = css`
  position: relative;
  bottom: -26px;
  z-index: 1;
  height: 15px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledColumnResizeHandler = styled.div`
  float: left;
  //display: block;
  position: absolute;
  cursor: col-resize;
  width: 0.5rem;
  background-color: rgba(61, 204, 74, 0.18);
  right: -1px;
  height: 61px;
  //z-index: 1;
  border-right: 2px solid #388bff;
  opacity: 0;
  &:hover {
    opacity: 1;
  }
`;

const StyledRowResizeHandler = styled.div`
  position: absolute;
  width: 200px;
  height: 8px;
  cursor: row-resize;
  border-bottom: 1px solid #7a3a37;
  left: -20px;
  //top: 40px;
  //top: 20px;
  //top: -1px;

  & > button {
    width: 15px;
    height: 15px;
    cursor: row-resize;
    background-color: #2a87d0;
  }
  opacity: 0;
`;

const StyledTableContainer = styled.div`
  position: absolute;
  top: 35px;
  left: 35px;

  & table {
    table-layout: fixed;
  }
`;

const StyledTableRootWrapper = styled.section`
  position: relative;
  & table {
    border-collapse: collapse;
  }
`; // table wrapper

const StyledPinning = styled.div`
  position: absolute;
  display: inline-block;
  height: 31px;
  width: 30px;
  border: 1px solid #00000033;
  //background-color: blue;
`; // pinning

const StyledDecorationTable = styled.table`
  position: absolute;
  left: ${({ left }) => (left ? left : 0)}px;
  top: ${({ top }) => (top ? top : 0)}px;
  //z-index: 1;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width}px;
  //height: 20px;
`;

const StyledDecoratorTd = styled.td`
  // width: ${(props) => props.width}px;
  width: 30px;
  //overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
`;

const StyledDecoratorTr = styled.tr`
  height: ${(props) => props.height}px;
`;

export default AdvancedTable;
