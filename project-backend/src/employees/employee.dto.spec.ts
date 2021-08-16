import { EmployeeDto } from './employee.dto';

describe('EmployeeDto', () => {
  it('should be defined', () => {
    expect(new EmployeeDto()).toBeDefined();
  });
});
