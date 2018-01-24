import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { IdListComponent } from './id-list.component';


describe('IdListComponent', () => {
  let component: IdListComponent;
  let fixture: ComponentFixture<IdListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ IdListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(IdListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
