import Downshift from 'downshift';
import { css, cx } from '@linaria/core';
import { styled } from '@linaria/react';
import { memo } from 'react';
import { isEqual } from 'lodash-es';

function Menu({ children, items, onChange, width, parentIndex, parentId, onClick }) {
  console.log('[ Menu ,james ] parentId itemOffsetWidth =', parentId);

  return (
    <Downshift
      // onChange={(selection) => onChange(selection, parentIndex, parentId)}
      itemToString={(item) => (item ? item.name : '')}
    >
      {({
        getInputProps,
        getItemProps,
        getLabelProps,
        getMenuProps,
        getToggleButtonProps,
        isOpen,
        inputValue,
        highlightedIndex,
        selectedItem,
        getRootProps,
      }) => (
        <StyledWrapper width={width || '16rem'}>
          <StyledTriggerWrapper width={width || '16rem'} {...getRootProps()}>
            {/*<label {...getLabelProps()}>label:</label>*/}
            <StyledTrigger {...getToggleButtonProps()} isOpen={isOpen}>
              {/*<span>{selectedItem?.name}</span>*/}
              {/*TX*/}
              {children}
              {/*<IoIosArrowDown className={cx(arrowOpenClass, isOpen && arrowCloseClass)} />*/}
            </StyledTrigger>
          </StyledTriggerWrapper>
          <StyledMenu {...getMenuProps()} width={'16rem'} isOpen={isOpen}>
            {items.map((item, index) => (
              <li
                key={item.name + index}
                data-option-id={item.id}
                className={cx(
                  listItemClass,
                  highlightedIndex === index && highlightItemClass
                  // selectedItem && selectedItem.id === item.id && selectedItemClass
                )}
                {...getItemProps({
                  item,
                  index,
                  'aria-selected': selectedItem && selectedItem.id === item.id,
                  'data-parent-index': parentIndex,
                  onClick: (e) => onClick(e, parentIndex, item),
                })}
              >
                <span className={centerClass}>{item.icon}</span>
                <span>{item.name}</span>
                {item.children && item.children.length > 0 && <span>{item.childIcon}</span>}
                {item.children && item.children.length > 0 && (
                  <StyledSubMenu isVisible={highlightedIndex === index}>
                    {item.children.map((childItem) => (
                      <li
                        key={childItem.id}
                        data-option-id={childItem.id}
                        onClick={(e) => onClick(e, parentIndex, childItem)}
                        className={cx(listItemClass)}
                      >
                        <span>{childItem.icon}</span>
                        <span>{childItem.name}</span>
                      </li>
                    ))}
                  </StyledSubMenu>
                )}
              </li>
            ))}
          </StyledMenu>
        </StyledWrapper>
      )}
    </Downshift>
  );
}

export default memo(Menu, (prevProps, nextProps) => isEqual(prevProps, nextProps));

const centerClass = css`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledWrapper = styled.div<{ width: number | string }>`
  //position: relative;
  position: relative;
  //width: ${({ width }) => (width ? width : '15rem')};
  font-size: 1.4rem;
  width: 100%;
  height: 100%;
`;

const StyledTriggerWrapper = styled.div<{ width: number | string }>`
  //display: flex;
  //flex-direction: column;
  //gap: 0.25rem;
  // width: ${({ width }) => (width ? width : '16rem')};
  user-select: none;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledTrigger = styled.div<{ isOpen: boolean }>`
  //width: 100%;
  //box-sizing: border-box;
  //padding: var(--padding-13) var(--padding-5);
  //background-color: var(--form-GRAY241);
  background-color: #ffffff00;
  color: var(--form-BLACK030);
  cursor: pointer;
  display: inline-block;
  //display: flex;
  //justify-content: center;
  //align-items: center;

  /*&:focus {
    background-color: #3dcc4a;
  }

  &:active {
    background-color: #cc3d3d;
  }*/
`;

const StyledMenu = styled.ul<{ isOpen: boolean; width: number | string }>`
  position: absolute;
  display: flex;
  flex-direction: column;
  color: var(--form-font-COLOR010);
  // width: ${({ width }) => (width ? width : '16rem')};
  width: 25rem;
  padding: 0.2rem 0;
  background-color: #fff;
  box-shadow:
    0 0.4rem 0.6rem -0.1rem rgba(0, 0, 0, 0.1),
    0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.06);
  border-radius: 0.3rem;
  //overflow-x: hidden;
  //overflow-y: auto;
  margin: 0;
  z-index: 2;
  &:hover {
    cursor: pointer;
  }
  &::-webkit-scrollbar {
    width: 0.7rem;
  }
  // max-height: ${({ isOpen }) => (isOpen === false ? 0 : 20)}rem;
  opacity: ${({ isOpen }) => (isOpen === false ? 0 : 1)};
  transform: ${({ isOpen }) => (isOpen === false ? `translateY(-10px)` : 'translateY(0px)')};
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  transition: all 200ms ease-in-out;
`;

const listItemClass = css`
  position: relative;
  display: grid;
  grid-template-columns: 3rem auto 2rem;
  column-gap: 0.2rem;
  width: 100%;
  height: 4rem;
  padding: var(--padding-8) var(--padding-16);
  align-items: center;
  z-index: 2;
`;

const highlightItemClass = css`
  background-color: #acd1ec;
  color: black;
`;

const StyledSubMenu = styled.ul<{ isVisible: boolean }>`
  position: absolute;
  top: 0;
  right: -130px;
  display: ${({ isVisible }) => (isVisible ? 'block' : 'none')};
  padding: 0.2rem 0;
  background-color: #fff;
  box-shadow:
    0 0.4rem 0.6rem -0.1rem rgba(0, 0, 0, 0.1),
    0 0.2rem 0.4rem -0.1rem rgba(0, 0, 0, 0.06);
  border-radius: 0.3rem;

  & > li:hover {
    background-color: #acd1ec;
    color: black;
  }
`;
