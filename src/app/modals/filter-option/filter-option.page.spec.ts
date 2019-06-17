import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterOptionPage } from './filter-option.page';

describe('FilterOptionPage', () => {
  let component: FilterOptionPage;
  let fixture: ComponentFixture<FilterOptionPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilterOptionPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterOptionPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
