import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LogeadoPage } from './logeado.page';

describe('LogeadoPage', () => {
  let component: LogeadoPage;
  let fixture: ComponentFixture<LogeadoPage>;

  beforeEach(async() => {
    fixture = TestBed.createComponent(LogeadoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
