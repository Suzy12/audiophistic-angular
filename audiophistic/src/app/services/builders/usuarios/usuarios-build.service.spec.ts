import { TestBed } from '@angular/core/testing';

import { UsuariosBuildService } from './usuarios-build.service';

describe('UsuariosBuildService', () => {
  let service: UsuariosBuildService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UsuariosBuildService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
