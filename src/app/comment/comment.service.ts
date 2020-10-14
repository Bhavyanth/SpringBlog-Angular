import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CommentPayload } from './comment.payload';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommentService {

  constructor(private httpClient: HttpClient) { }

  getAllCommentsForPost(postId: number): Observable<CommentPayload[]> {
    return this.httpClient.get<CommentPayload[]>('http://ec2-18-191-215-38.us-east-2.compute.amazonaws.com:8080/api/comments/by-post/' + postId);
  }

  postComment(commentPayload: CommentPayload): Observable<any> {
    return this.httpClient.post<any>('http://ec2-18-191-215-38.us-east-2.compute.amazonaws.com:8080/api/comments/', commentPayload);
  }

  getAllCommentsByUser(name: string) {
    return this.httpClient.get<CommentPayload[]>('http://ec2-18-191-215-38.us-east-2.compute.amazonaws.com:8080/api/comments/by-user/' + name);
  }
}
