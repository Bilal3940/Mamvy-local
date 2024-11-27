import { mount } from '@cypress/react18';
import { MuiSelect } from '@/components';

describe('MuiSelect Component', () => {
  const props = {
    id: 'select-id',
    name: 'select-name',
    options: [
      { id: 1, name: 'Option 1' },
      { id: 2, name: 'Option 2' },
    ],
    handleSelect: () => {},
    value: '1',
    valueIsID: true,
    color: 'black',
    isMultiple: false,
    defaultValue: 'Default Value',
    disable: false,
    displayedValue: 'Displayed Value',
    status: 'success',
    errorMessage: 'Error Message',
  };

  it('renders the component with the provided props', () => {
    mount(<MuiSelect {...props} />);
  });

  it('renders with the correct default props if no props are passed', () => {
    const defaultProps = {
      name: '',
      options: [],
      handleSelect: () => {},
      value: '',
      valueIsID: true,
      color: '',
      isMultiple: false,
      defaultValue: '',
      disable: false,
      displayedValue: '',
      status: '',
      errorMessage: '',
    };
    mount(<MuiSelect {...defaultProps} />);
  });

  it('renders Select with options', () => {
    mount(<MuiSelect {...props} />);
    cy.get('[data-cy="select-component"]').click();
    cy.contains('Option 1').should('be.visible');
    cy.get('li').should('have.length', 2);
  });

  it('handleSelect is called correctly', () => {
    const handleSelect = cy.stub().as('handleSelect');
    mount(<MuiSelect {...props} value={''} handleSelect={handleSelect} />);
    cy.get('[data-cy="select-component"]').click();
    cy.get('li').eq(0).click();
    cy.get('@handleSelect').should('have.been.calledOnce');
  });
  it('render dark theme style', () => {
    const handleSelect = cy.stub().as('handleSelect');
    mount(<MuiSelect {...props} isDarkTheme={false} value={''} handleSelect={handleSelect} />);
  });
  it('render only required params', () => {
    const handleSelect = cy.stub().as('handleSelect');
    mount(<MuiSelect value={''} handleSelect={handleSelect} />);
  });
  it('status error', () => {
    const handleSelect = cy.stub().as('handleSelect');
    mount(<MuiSelect value={''} error={true} handleSelect={handleSelect} />);
  });
});
