import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTasksComponent } from './manage-tasks.component';

describe('ManageTasksComponent', () => {
  let component: ManageTasksComponent;
  let fixture: ComponentFixture<ManageTasksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTasksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageTasksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should  return the sum of numbers', () => {
    expect(component.sum(1, 2)).toEqual(3);
    expect(component.sum(3, 2)).toEqual(5);
  });
  afterAll(()=> {
    expect(component.users).toBeTruthy();
  })

});
