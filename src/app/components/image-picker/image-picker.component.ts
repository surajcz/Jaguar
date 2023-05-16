import { Component, OnInit, ViewChild } from '@angular/core';
import { ModalController, NavController } from '@ionic/angular';

import { ImagePicker, ImagePickerOptions } from '@ionic-native/image-picker/ngx';
import { Crop, CropOptions } from '@ionic-native/crop/ngx';
import { File } from '@ionic-native/file/ngx';

import { Filesystem, Directory, Encoding } from '@capacitor/filesystem';

@Component({
  selector: 'app-image-picker',
  templateUrl: './image-picker.component.html',
  styleUrls: ['./image-picker.component.scss'],
})
export class ImagePickerComponent implements OnInit {
  @ViewChild('output') output: any;
  croppedImgUrl = "";
  loading = false;
  pickerOptions: ImagePickerOptions = {
    maximumImagesCount: 1,
    quality: 55,
  };
  cropOpt: CropOptions = {
    quality: 55
  }

  imagesArray: any[] = [];

  constructor(
    public navCtrl: NavController,
    private modalCtrl: ModalController,
    private imagePicker: ImagePicker,
    private crop: Crop,
    private file: File
  ) { }

  ngOnInit() { }

  goBack() {
    this.modalCtrl.dismiss()
    this.navCtrl.back()
  }

  selectImage() {
    this.imagePicker.getPictures(this.pickerOptions).then((results) => {
      console.log('111111---results', results)
      for (var i = 0; i < results.length; i++) {
        console.log('22222---results[i]', results[i])
        // let val = results[i];
        // let valArr = val.split("");
        // valArr.splice(6, 1);
        // console.log('---val------', valArr)
        // let selected = valArr.join("");
        // console.log('---selected------', selected)
        this.imageCropMethod(results[i]);
      }
    }, (error) => {
      alert(error);
    });
  }
  imageCropMethod(pathImage: any) {
    console.log('33333---pathImage', pathImage)

    this.crop.crop(pathImage, this.cropOpt)
      .then(
        newPath => {
          console.log('44444')
          this.croppedImg(newPath.split('?')[0])

        },
        error => {
          alert('Error in cropper' + error);
        }
      );
  }
  async croppedImg(pathImage: any) {
    console.log('55555---pathImage', pathImage)
    this.loading = true;
    var copyUrl = pathImage;
    var splitPath = copyUrl.split('/');
    var imgName = splitPath[splitPath.length - 1];
    var fileUrl = pathImage.split(imgName)[0];
    console.log('66666---fileUrl', fileUrl, '---imgName', imgName)

    // let val = results[i];
    // let valArr = fileUrl.split("");
    // valArr.splice(6, 1);
    // console.log('---val------', valArr)
    // let selected = valArr.join("");
    // console.log('---selected------', selected)

    const contents = await Filesystem.readFile({
      path: copyUrl,
    });
    console.log('-----contents----', contents)


    this.file.readAsDataURL(fileUrl, imgName).then(base64 => {
      console.log('77777---base64', base64)

      this.croppedImgUrl = base64;
      console.log('888888')

      this.loading = false;
    }, error => {
      console.error(error);
      this.loading = false;
    });
  }


  inputChange(val: any) {
    console.log('<<<<<<<working>>>>', val.target.files)
    const file = val.target.files;
    this.imagesArray.push(file[0]);
    this.displayImages()
  }

  displayImages() {
    let images = ""
    this.imagesArray.forEach((image: any, index: any) => {
      images += `<div class="image">
      <img src="${URL.createObjectURL(image)}" alt="image">
      <span (click)="deleteImage(${index})">X</span>
      </div>`
    })
    this.output.nativeElement.innerHTML = images;
    console.log('OUTPUT---before', this.output)
  }

  deleteImage(index: any) {
    console.log('deleteImage', index)
    if (index == 0) {
      this.imagesArray.pop()
    } else {
      this.imagesArray.splice(index, 1)
    }
    this.displayImages()
  }
}
