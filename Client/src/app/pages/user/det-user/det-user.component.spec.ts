import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetUserComponent } from './det-user.component';

describe('DetUserComponent', () => {
  let component: DetUserComponent;
  let fixture: ComponentFixture<DetUserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DetUserComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DetUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
