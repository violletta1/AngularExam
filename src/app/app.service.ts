import { Injectable } from '@angular/core';
import { deleteObject, getDownloadURL, ref, Storage, uploadBytes } from '@angular/fire/storage';
import { from, Observable, switchMap } from 'rxjs';
// import { Storage } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class AppService {

  constructor(private storage:Storage) { }

  uploadImage(image:File,path:string): Observable<string> {
    const storageRef = ref(this.storage,path);
    const uploadTask = from(uploadBytes(storageRef,image));
    return uploadTask.pipe(
      switchMap((result)=> getDownloadURL(result.ref))
    )
  }
  deleteImage(image: any): Observable<void> {
    // Assuming 'imageName' is the property that holds the image name
    const imageName = image.imageName; // Adjust accordingly if the property name is different
    const storageRef = ref(this.storage, imageName);
    return from(deleteObject(storageRef));
  }
}
