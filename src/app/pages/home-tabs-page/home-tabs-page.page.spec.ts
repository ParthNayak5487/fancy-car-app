import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeTabsPagePage } from './home-tabs-page.page';

describe('HomeTabsPagePage', () => {
  let component: HomeTabsPagePage;
  let fixture: ComponentFixture<HomeTabsPagePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ HomeTabsPagePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeTabsPagePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
