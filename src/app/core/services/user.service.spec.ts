import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { UserService } from './user.service';
import { User } from '../models/user.model';

describe('UserService', () => {
  let service: UserService;
  let httpMock: HttpTestingController;
  const apiUrl = 'http://localhost:3000/users';

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [UserService]
    });
    service = TestBed.inject(UserService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should fetch all users', () => {
    const mockUsers: User[] = [
      { id: 1, username: 'john', email: 'john@test.com', jobRole: 'tech' },
      { id: 2, username: 'jane', email: 'jane@test.com', jobRole: 'qa' }
    ];

    service.getUsers().subscribe(users => {
      expect(users.length).toBe(2);
      expect(users).toEqual(mockUsers);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('GET');
    req.flush(mockUsers);
  });

  it('should add a new user', () => {
    const newUser = { username: 'test', email: 'test@test.com', jobRole: 'gd' as const };
    const mockResponse: User = { id: 3, ...newUser };

    service.addUser(newUser).subscribe(user => {
      expect(user).toEqual(mockResponse);
    });

    const req = httpMock.expectOne(apiUrl);
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(newUser);
    req.flush(mockResponse);
  });

  it('should update a user', () => {
    const updatedUser: User = { id: 1, username: 'updated', email: 'updated@test.com', jobRole: 'id' };

    service.updateUser(updatedUser).subscribe(user => {
      expect(user).toEqual(updatedUser);
    });

    const req = httpMock.expectOne(`${apiUrl}/1`);
    expect(req.request.method).toBe('PUT');
    req.flush(updatedUser);
  });

  it('should delete a user', () => {
    const userId = 1;

    service.deleteUser(userId).subscribe(response => {
      expect(response).toBeUndefined();
    });

    const req = httpMock.expectOne(`${apiUrl}/${userId}`);
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});