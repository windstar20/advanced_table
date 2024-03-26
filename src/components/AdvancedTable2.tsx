import { createRef, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { styled } from '@linaria/react';
import { generateTableJson } from '../utils/common.ts';
import { css, cx } from '@linaria/core';
import { CgMoreR } from '@react-icons/all-files/cg/CgMoreR';
import { FaTrash } from '@react-icons/all-files/fa/FaTrash';
import { MdViewColumn } from '@react-icons/all-files/md/MdViewColumn';
import { BiColumns } from '@react-icons/all-files/bi/BiColumns';
import { FaAlignLeft } from '@react-icons/all-files/fa/FaAlignLeft';
import { FaAlignCenter } from '@react-icons/all-files/fa/FaAlignCenter';
import { FaAlignRight } from '@react-icons/all-files/fa/FaAlignRight';
import { BsTriangleFill } from '@react-icons/all-files/bs/BsTriangleFill';
import { AiOutlineCaretRight } from '@react-icons/all-files/ai/AiOutlineCaretRight';
import { FaDatabase } from '@react-icons/all-files/fa/FaDatabase';
import { startTransition } from 'react';
import Menu from './Menu.tsx';

import ContentEditable from 'react-contenteditable';
function AdvancedTable() {
  const [tableHeight, setTableHeight] = useState('auto');
  const [tableWidth, setTableWidth] = useState('auto');
  const [activeIndex, setActiveIndex] = useState(null);
  const [selectedCell, setSelectedCell] = useState(null);
  const [cellMousePosition, setCellMousePosition] = useState({ rowIndex: null, columnIndex: null });

  const [columnDecorations, setColumnDecorations] = useState(
    generateTableJson(['1', '2', '3'], 'column')
  );
  // const [rowDecorations, setRowDecorations] = useState(generateTableJson(['1', '2'], 'row'));
  const columnDecoratorsRef = useRef(columnDecorations.map(() => createRef()));
  // const rowDecoratorsRef = useRef(rowDecorations.map(() => createRef()));
  const contentTableRef = useRef(null);

  //!type : 0 = header, 1 = body, 2 = footer
  const [tableData, setTableData] = useState([
    {
      row: {
        id: uuidv4(),
        height: 50,
        type: 1,
      },
      cells: [
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          textDecoration: 'none',
          fontStyle: 'normal',
          ref: createRef(),
        },
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          ref: createRef(),
        },
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          ref: createRef(),
        },
      ],
    },
    {
      row: {
        id: uuidv4(),
        height: 50,
        type: 'body',
      },
      cells: [
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          ref: createRef(),
        },
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          ref: createRef(),
        },
        {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          isBold: false,
          color: '#000',
          backgroundColor: '#FFF',
          ref: createRef(),
        },
      ],
    },
  ]);

  const decorationColumnMenus = useMemo(
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
        icon: <MdViewColumn style={{ fontSize: '2rem' }} />,
      },
      {
        id: '105',
        type: 'column',
        action: 'autoFit',
        name: 'Auto size columns to Fit',
        icon: <BiColumns style={{ fontSize: '2rem' }} />,
      },
      {
        id: '104',
        type: 'column',
        action: 'remove',
        name: 'Remove column',
        icon: <FaTrash />,
      },
      {
        id: '110',
        type: 'column',
        action: 'textAlign',
        name: 'Align Text',
        icon: <FaAlignLeft />,
        childIcon: <AiOutlineCaretRight />,
        children: [
          {
            id: '111',
            type: 'column',
            action: 'textAlign',
            name: 'Left',
            icon: <FaAlignLeft />,
          },
          {
            id: '112',
            type: 'column',
            action: 'textAlign',
            name: 'Center',
            icon: <FaAlignCenter />,
          },
          {
            id: '113',
            type: 'column',
            action: 'textAlign',
            name: 'Right',
            icon: <FaAlignRight />,
          },
        ],
      },
      /*{
        id: '111',
        type: 'column',
        action: 'textAlign',
        name: 'Align Left',
        icon: <FaAlignLeft />,
      },
      {
        id: '112',
        type: 'column',
        action: 'textAlign',
        name: 'Align Center',
        icon: <FaAlignCenter />,
      },
      {
        id: '113',
        type: 'column',
        action: 'textAlign',
        name: 'Align Right',
        icon: <FaAlignRight />,
      },*/
    ],
    []
  );

  const decorationRowMenus = useMemo(
    () => [
      {
        id: '101',
        type: 'row',
        action: 'add',
        name: 'Add row above',
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
              fill="var(--ds-border-inverse, #FFFFFF)"
              fillOpacity="0.01"
            ></rect>
            <rect x="6" y="12" width="12" height="3" rx="0.5" fill="currentColor"></rect>
            <rect x="6" y="16" width="12" height="3" rx="0.5" fill="currentColor"></rect>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M13 7V5.99C12.9974 5.72652 12.8908 5.47473 12.7036 5.28935C12.5163 5.10397 12.2635 4.99999 12 5C11.444 5 11 5.444 11 5.99V7H10C9.73478 7 9.48043 7.10536 9.29289 7.29289C9.10536 7.48043 9 7.73478 9 8C9 8.26522 9.10536 8.51957 9.29289 8.70711C9.48043 8.89464 9.73478 9 10 9H11V10.01C11.0026 10.2735 11.1092 10.5253 11.2964 10.7107C11.4837 10.896 11.7365 11 12 11C12.556 11 13 10.556 13 10.01V9H14C14.2652 9 14.5196 8.89464 14.7071 8.70711C14.8946 8.51957 15 8.26522 15 8C15 7.73478 14.8946 7.48043 14.7071 7.29289C14.5196 7.10536 14.2652 7 14 7H13Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      },
      {
        id: '102',
        type: 'row',
        action: 'add',
        name: 'Add row below',
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
              transform="matrix(-1 0 0 -1 24 24)"
              fill="var(--ds-border-inverse, #FFFFFF)"
              fillOpacity="0.01"
            ></rect>
            <rect
              x="18"
              y="12"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-180 18 12)"
              fill="currentColor"
            ></rect>
            <rect
              x="18"
              y="8"
              width="12"
              height="3"
              rx="0.5"
              transform="rotate(-180 18 8)"
              fill="currentColor"
            ></rect>
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M11 17V18.01C11.0026 18.2735 11.1092 18.5253 11.2964 18.7107C11.4837 18.896 11.7365 19 12 19C12.556 19 13 18.556 13 18.01V17H14C14.2652 17 14.5196 16.8946 14.7071 16.7071C14.8946 16.5196 15 16.2652 15 16C15 15.7348 14.8946 15.4804 14.7071 15.2929C14.5196 15.1054 14.2652 15 14 15H13V13.99C12.9974 13.7265 12.8908 13.4747 12.7036 13.2893C12.5163 13.104 12.2635 13 12 13C11.444 13 11 13.444 11 13.99V15H10C9.73478 15 9.48043 15.1054 9.29289 15.2929C9.10536 15.4804 9 15.7348 9 16C9 16.2652 9.10536 16.5196 9.29289 16.7071C9.48043 16.8946 9.73478 17 10 17H11Z"
              fill="currentColor"
            ></path>
          </svg>
        ),
      },
      /*{
        id: '103',
        type: 'column',
        action: 'distribute',
        name: 'Distribute columns equally',
        icon: <MdViewColumn style={{ fontSize: '2rem' }} />,
      },*/
      {
        id: '104',
        type: 'row',
        action: 'remove',
        name: 'Remove row',
        icon: <FaTrash />,
      },
    ],
    []
  );

  const cellMenus = useMemo(
    () => [
      {
        id: '110',
        type: 'cell',
        action: 'textAlign',
        name: 'Align Text',
        icon: <FaAlignLeft />,
        childIcon: <AiOutlineCaretRight />,
        children: [
          {
            id: '111',
            type: 'cell',
            action: 'textAlign',
            name: 'Left',
            icon: <FaAlignLeft />,
          },
          {
            id: '112',
            type: 'cell',
            action: 'textAlign',
            name: 'Center',
            icon: <FaAlignCenter />,
          },
          {
            id: '113',
            type: 'cell',
            action: 'textAlign',
            name: 'Right',
            icon: <FaAlignRight />,
          },
        ],
      },
      {
        id: '120',
        type: 'cell',
        action: 'dataBind',
        name: 'Data Binding',
        icon: <FaDatabase />,
      },
    ],
    []
  );

  const handleCellClick = (rowIndex, columnIndex) => {
    console.log('cell click   ', rowIndex, columnIndex);
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

  const mouseMove = useCallback(
    (e) => {
      /*console.log('mouse move activeIndex', activeIndex);
      console.log('mouse move columnDecoratorsRef', columnDecoratorsRef);
      console.log(columnDecoratorsRef.current[activeIndex].current.getBoundingClientRect());
      console.log('current width ', columnDecoratorsRef.current[activeIndex].current.style.width);

      const selectedColumnRef = columnDecoratorsRef.current[activeIndex].current;
      const width = e.clientX - selectedColumnRef.getBoundingClientRect().x;

      columnDecoratorsRef.current.forEach((columnRef) => {
        console.log(
          '👉🏼AdvancedTable/ :234 - << james >> resize column   = ',
          columnRef.current.style.width
        );
      });*/
      //! ref 변경.
      // columnDecoratorsRef.current[activeIndex].current.style.width = `${width}px`;

      const selectedColumnRef = columnDecoratorsRef.current[activeIndex].current;
      const width = e.clientX - selectedColumnRef.getBoundingClientRect().x;
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

      setTableHeight((prevState) => {
        console.log('[ setTableHeight ] prevState =', prevState);
        return contentTableRef.current.offsetHeight;
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
  };

  const handleColumnMenuClick = (e, columnIndex, item) => {
    console.log('[ AdvancedTable2/handleColumnMenuClick : 543, james ]  =', columnIndex, item);
    if (item.type === 'column') {
      if (item.action === 'add') {
        const initColumnDecorationObj = {
          id: uuidv4(),
          value: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          text: '',
          width: 100,
        };
        const initTableDataObj = {
          id: uuidv4(),
          value: '',
          html: '',
          rowSpan: 1,
          colSpan: 1,
          isSelected: false,
          isEditable: false,
          textAlign: 'left',
          backgroundColor: '#FFF',
          ref: createRef(),
        };

        const indexToAdd = item.id === '101' ? 0 : 1;
        columnDecoratorsRef.current.splice(columnIndex + indexToAdd, 0, createRef());
        setColumnDecorations((prevState) => {
          const newColumn = [...prevState];
          newColumn.splice(columnIndex + indexToAdd, 0, initColumnDecorationObj);
          return newColumn;
        });

        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = [...row.cells];
            cells.splice(columnIndex + indexToAdd, 0, initTableDataObj);
            const newRow = { ...row, cells: cells };
            return newRow;
          });
          return newTableList;
        });
        // columnDecoratorsRef.current.splice(columnIndex + indexToAdd, 0, createRef());
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
            // return { cells: cells };
            const newRow = { ...row, cells: cells };
            return newRow;
          });
          return newTableList;
        });
        columnDecoratorsRef.current.splice(columnIndex, 1);
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
            // return { cells: cells };
            const newRow = { ...row, cells: cells };
            return newRow;
          });
          return newTableList;
        });
        startTransition(() => {
          setColumnDecorations((prevState) => {
            const newColumnDecorations = prevState.map((column) => {
              return {
                ...column,
                width: updatedColumnWidth,
              };
            });
            return newColumnDecorations;
          });
        });
        /*columnDecoratorsRef.current.forEach((columnRef) => {
          console.log(`columnRef = `, columnRef.current.style.width);
          columnRef.current.style.width = `${updatedColumnWidth}px`;
        });*/
      }
      if (item.action === 'autoFit') {
        const tableRootWidth = e.target.closest('[data-table-root="tableRoot"]').offsetWidth;
        const columnCount = tableData[0].cells.length;
        const updatedColumnWidth = tableRootWidth / columnCount;
        setTableData((prevState) => {
          const tableList = [...prevState];
          const newTableList = tableList.map((row, rowIdx) => {
            const cells = row.cells.map((cell, cellIdx) => {
              return {
                ...cell,
                width: updatedColumnWidth,
              };
            });
            const newRow = { ...row, cells: cells };
            return newRow;
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
      }
      if (item.action === 'textAlign') {
        console.log('[ AdvancedTable2 textAlign] dataset =', item.action);
        const optionId = e.target.closest('li').dataset.optionId;

        const alignOption = {
          '111': 'left',
          '112': 'center',
          '113': 'right',
        };
        setTableData((prevState) => {
          const tableData = [...prevState];
          const newTable = tableData.map((row, rowIdx) => {
            const cells = [...row.cells];

            const newCells = cells.map((cell, cellIdx) => {
              if (cellIdx === columnIndex) {
                return {
                  ...cell,
                  textAlign: alignOption[optionId],
                };
              } else {
                return cell;
              }
            });
            const newRow = { ...row, cells: newCells };
            return newRow;
          });
          return newTable;
        });
        // }
      }
    }
  }; //End handleColumnMenuClick

  const handleRowMenuClick = (e, rowIndex, item) => {
    console.log('[ AdvancedTable2/handleRowMenuClick : 474, james ]  =', e, rowIndex, item);
    console.log('[ AdvancedTable2/handleRowMenuClick : rowIndex ]  =', rowIndex);

    //! tableData cells length will be changed.
    const initTableData = {
      row: {
        id: uuidv4(),
        height: 50,
        type: 1,
      },
      cells: columnDecorations.map((item) => ({
        id: uuidv4(),
        value: '',
        html: '',
        rowSpan: 1,
        colSpan: 1,
        isSelected: false,
        isEditable: false,
        textAlign: 'left',
        backgroundColor: '#FFF',
        ref: createRef(),
      })),
    };
    if (item.action === 'add') {
      const indexToAdd = item.id === '101' ? 0 : 1;
      /*setRowDecorations((prevState) => {
        const newRow = [...prevState];
        // console.log('[ AdvancedTable2/ : 536, james ] newRow =', newRow);
        newRow.splice(rowIndex + indexToAdd, 0, initRowDecorationObj);
        return newRow;
      });*/
      setTableData((prevState) => {
        const newTableList = [...prevState];
        newTableList.splice(rowIndex + indexToAdd, 0, initTableData);
        return newTableList;
      });
      setTableHeight((prevState) => {
        console.log('[ AdvancedTable2/ : 536, james ] prevState =', prevState);
        return prevState + 50;
      });

      // rowDecoratorsRef.current.splice(rowIndex + indexToAdd, 0, createRef());
    }

    if (item.action === 'remove') {
      /*setRowDecorations((prevState) => {
        const newRows = prevState.filter((item, idx) => idx !== rowIndex);
        return newRows;
      });*/
      setTableData((prevState) => {
        const newTableList = prevState.filter((item, idx) => idx !== rowIndex);
        return newTableList;
      });
      setTableHeight((prevState) => {
        console.log('[ AdvancedTable2/ : 536, james ] prevState =', prevState);
        return prevState - 50;
      });
    }
  };

  const handleTableTextChange = (e, value, rowIndex, colIndex) => {
    console.log(`textChange = `, e, value, rowIndex, colIndex);

    setTableData((prevState) => {
      const tableData = [...prevState];
      const newTable = tableData.map((row, rowIdx) => {
        const cells = [...row.cells];

        const newCells = cells.map((cell, cellIdx) => {
          if (rowIdx === rowIndex && cellIdx === colIndex) {
            return {
              ...cell,
              html: value,
            };
          } else {
            return cell;
          }
        });
        const newRow = { ...row, cells: newCells };
        return newRow;
      });
      return newTable;
    });
  };

  const handleCellMenuClick = (e, columnIndex, item) => {
    console.log(`CellMenu Click = `, e, columnIndex, item);
    console.log(`CellMenu Click closest li = `, e.target.closest('li'));
    console.log(`CellMenu Click = selectedCell`, selectedCell);

    if (item.action === 'textAlign') {
      const optionId = e.target.closest('li').dataset.optionId;
      const alignOption = {
        '111': 'left',
        '112': 'center',
        '113': 'right',
      };
      setTableData((prevState) => {
        const tableData = [...prevState];
        const newTable = tableData.map((row, rowIdx) => {
          const newRow = { ...row };
          if (rowIdx === selectedCell?.rowIndex) {
            const cells = [...row.cells];
            const newCells = cells.map((cell, cellIdx) => {
              if (cellIdx === selectedCell?.columnIndex) {
                return {
                  ...cell,
                  textAlign: alignOption[optionId],
                };
              } else {
                return cell;
              }
            });
            const newRow = { ...row, cells: newCells };
            return newRow;
          } else {
            return newRow;
          }
        });
        return newTable;
      });
    }
  };

  const handleCellMouseEnter = (e, rowIndex, columnIndex) => {
    setCellMousePosition((prevState) => ({ ...prevState, rowIndex, columnIndex }));
  };

  return (
    <StyledTableRootWrapper data-table-root={'tableRoot'}>
      {/*<StyledPinning>+</StyledPinning>*/}
      <StyledDecorationTable left={0} top={-43}>
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
                  border: '1px solid #FFFFF00',
                }}
              >
                <div
                  className={columnControlWrapperClass}
                  style={{ display: cellMousePosition.columnIndex === idx ? 'block' : 'none' }}
                >
                  <div role={'menu-area'}>
                    <Menu
                      parentIndex={idx}
                      parentId={item.id}
                      width={'15'}
                      items={decorationColumnMenus}
                      onChange={handleColumnMenuChange}
                      onClick={handleColumnMenuClick}
                    >
                      <CgMoreR
                        className={columnControlIconClass}
                        data-idx={idx}
                        data-id={item.id}
                      />
                    </Menu>
                  </div>
                </div>
                {/*{item.text}*/}
              </StyledDecoratorTd>
            ))}
          </tr>
        </tbody>
      </StyledDecorationTable>
      {/*<StyledDecorationTable top={35} style={{ width: 30 }}>
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
      </StyledDecorationTable>*/}
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
                key={row.row.id}
                style={{
                  // height: rowDecorations.filter((item, idx) => idx === rowIndex)[0].height,
                  height: row.row.height,
                  position: 'relative',
                }}
              >
                {row.cells.map((cell, columnIndex) => (
                  <td
                    key={cell.id}
                    className={tableTdClass}
                    onClick={() => handleCellClick(rowIndex, columnIndex)}
                    onContextMenu={(e) => console.log(`contextMenu = `, e.target)}
                    onMouseEnter={(e) => handleCellMouseEnter(e, rowIndex, columnIndex)}
                    style={{
                      border: '1px solid #dedede',
                      outline:
                        selectedCell?.rowIndex === rowIndex &&
                        selectedCell?.columnIndex === columnIndex
                          ? '1px solid #388bff'
                          : 'none',
                      outlineOffset: '-1px',
                      rowSpan: cell.rowSpan,
                      colSpan: cell.colSpan,
                      whiteSpace: 'wrap',
                      width: columnDecorations.filter((item, idx) => idx === columnIndex)[0].width,
                      maxWidth: columnDecorations.filter((item, idx) => idx === columnIndex)[0]
                        .width,
                      padding: '0.8rem',
                      height: 'inherit',
                    }}
                  >
                    <div style={{ position: 'relative' }}>
                      <div
                        style={{
                          position: 'absolute',
                          top: -4,
                          right: 2,
                          display:
                            selectedCell?.rowIndex === rowIndex &&
                            selectedCell?.columnIndex === columnIndex &&
                            'block',
                        }}
                        className={cx(cellMenuClass, 'cellMenu')}
                      >
                        <Menu
                          parentIndex={rowIndex}
                          parentId={row.row.id}
                          width={'15'}
                          items={cellMenus}
                          // onChange={handleColumnMenuChange}
                          onClick={handleCellMenuClick}
                        >
                          <BsTriangleFill className={cx(columnControlIconClass, cellIconClass)} />
                        </Menu>
                      </div>
                    </div>
                    <div style={{ height: '100%' }}>
                      <ContentEditable
                        ref={cell.ref}
                        html={cell.html}
                        data-column-id={cell.id}
                        data-column-idx={columnIndex}
                        data-row-id={row.row.id}
                        data-row-idx={rowIndex}
                        onChange={(e) =>
                          handleTableTextChange(e, e.target.value, rowIndex, columnIndex)
                        }
                        style={{
                          textAlign: cell.textAlign,
                        }}
                        className={contentTableClass}
                      />
                    </div>
                    {columnIndex === 0 && (
                      <StyledRowResizeHandler>
                        <div
                          style={{
                            position: 'relative',
                            display: cellMousePosition.rowIndex === rowIndex ? 'block' : 'none',
                          }}
                        >
                          <Menu
                            parentIndex={rowIndex}
                            parentId={row.row.id}
                            width={'15'}
                            items={decorationRowMenus}
                            onChange={handleColumnMenuChange}
                            onClick={handleRowMenuClick}
                          >
                            <CgMoreR className={cx(columnControlIconClass, rowIconClass)} />
                          </Menu>
                        </div>
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

const contentTableClass = css`
  height: 100%;
  &:focus {
    border-color: red;
    outline: none;
  }
`;

const cellMenuClass = css`
  display: none;
`;

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

const tableTdClass = css`
  &:hover {
    //background-color: rgba(161, 40, 40, 0.77);
    & .cellMenu {
      //display: block;
    }
  }
`;

const rowIconClass = css`
  transform: rotate(90deg);
`;

const cellIconClass = css`
  transform: rotate(180deg);
  font-size: var(--font-size-10);
`;

const columnControlWrapperClass = css`
  position: relative;
  bottom: -28px;
  z-index: 1;
  height: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledColumnResizeHandler = styled.div`
  float: left;
  position: absolute;
  cursor: col-resize;
  width: 0.7rem;
  background-color: rgba(39, 161, 50, 0.18);
  right: -1px;
  height: 61px;
  z-index: 1;
  border-right: 2px solid #388bff;
  opacity: 0;

  &:hover {
    opacity: 1;
  }
`;

const StyledRowResizeHandler = styled.div`
  position: absolute;
  width: 20px;
  height: 100%;
  cursor: pointer;
  top: 0;
  left: -10px;
  display: flex;
  justify-content: center;
  align-items: center;
  //border-bottom: 1px solid #7a3a37;
  //left: -20px;
  //top: 40px;
  //top: 20px;
  //top: -1px;
  //background-color: #223e54;

  opacity: 1;
`;

const StyledTableContainer = styled.div`
  /*position: absolute;
  top: 35px;
  left: 35px;*/
  z-index: 2;
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
  border: 1px solid rgba(0, 0, 0, 0);
  //background-color: blue;
`; // pinning

const StyledDecorationTable = styled.table`
  position: absolute;
  left: ${({ left }) => (left ? left : 0)}px;
  top: ${({ top }) => (top ? top : 0)}px;
  z-index: 2;
`;

const StyledCol = styled.col`
  width: ${(props) => props.width}px;
  //height: 20px;
`;

const StyledDecoratorTd = styled.td`
  width: 30px;
  white-space: nowrap;
  text-overflow: ellipsis;
  position: relative;
  padding: 0.8rem;
`;

const StyledDecoratorTr = styled.tr`
  height: ${(props) => props.height}px;
`;

export default AdvancedTable;
