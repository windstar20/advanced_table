import { v4 as uuidv4 } from 'uuid';

export const generateTableJson = (state, type) => {
  return state.map((item, index) => {
    if (type === 'column') {
      return {
        id: uuidv4(),
        value: item,
        rowSpan: 1,
        colSpan: 1,
        isSelected: false,
        text: item,
        width: 100,
      };
    } else if (type === 'row') {
      return {
        id: uuidv4(),
        value: item,
        rowSpan: 1,
        colSpan: 1,
        isSelected: false,
        text: item,
        width: 100,
        height: 50,
      };
    } else {
      return {
        id: uuidv4(),
        value: item,
        html: '',
        rowSpan: 1,
        colSpan: 1,
        isSelected: false,
        isEditable: false,
        textAlign: 'left',
        backgroundColor: '#FFF',
        text: item,
        width: 100,
      };
    }
  });
};
