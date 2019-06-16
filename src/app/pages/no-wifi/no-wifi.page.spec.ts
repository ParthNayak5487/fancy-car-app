import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NoWifiPage } from './no-wifi.page';

describe('NoWifiPage', () => {
  let component: NoWifiPage;
  let fixture: ComponentFixture<NoWifiPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NoWifiPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NoWifiPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
