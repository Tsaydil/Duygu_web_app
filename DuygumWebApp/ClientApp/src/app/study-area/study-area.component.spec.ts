import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyAreaComponent } from './study-area.component';

describe('StudyAreaComponent', () => {
  let component: StudyAreaComponent;
  let fixture: ComponentFixture<StudyAreaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyAreaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyAreaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
