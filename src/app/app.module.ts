import { AngularFireDatabaseModule } from '@angular/fire/database';
import { ChatService } from './services/chat.service';
import { FullCalendarModule } from '@fullcalendar/angular';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginAppComponent } from './login-app/login-app.component';
import { AngularFontAwesomeModule } from 'angular-font-awesome';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { AuthService } from './services/auth.service';
import { AngularFireModule } from '@angular/fire';
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { SettingsComponent } from './settings/settings.component';
import {AngularFireStorageModule, StorageBucket} from '@angular/fire/storage';
import { MainPageComponent } from './main-page/main-page.component';
import { GalleryComponent } from './gallery/gallery.component';
import { FileDropDirective } from './directives/file-drop.directive';
import { UploadService } from './services/upload.service';
import { UploadTaskComponent } from './upload-task/upload-task.component';
import { ChatAppComponent } from './chat-app/chat-app.component';
import { CallendarComponent } from './callendar/callendar.component';
import { NotesComponent } from './notes/notes.component';
import { UserListComponent } from './chat-app/user-list/user-list.component';
import { ChatFormComponent } from './chat-app/chat-form/chat-form.component';
import { FeedComponent } from './chat-app/feed/feed.component';
import { MessageComponent } from './chat-app/message/message.component';
import { ChatroomComponent } from './chat-app/chatroom/chatroom.component';
import { UserItemComponent } from './chat-app/user-item/user-item.component';
import { DragDropModule } from '@angular/cdk/drag-drop';

const appRoutes: Routes = [
  { path: 'login', component: LoginAppComponent },
  { path: 'dashboard', component: DashboardComponent,
  children: [
    { path: '', component:  MainPageComponent },
    { path: 'settings', component:  SettingsComponent },
    { path: 'gallery', component:  GalleryComponent },
    { path: 'chat', component:  ChatAppComponent },
    { path: 'callendar', component:  CallendarComponent },
    { path: 'notes', component:  NotesComponent }
  ]},
  { path: 'reset', component: ResetPasswordComponent },
  { path: '',
    redirectTo: '/login',
    pathMatch: 'full'
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginAppComponent,
    PageNotFoundComponent,
    DashboardComponent,
    ResetPasswordComponent,
    SettingsComponent,
    MainPageComponent,
    GalleryComponent,
    FileDropDirective,
    UploadTaskComponent,
    ChatAppComponent,
    CallendarComponent,
    NotesComponent,
    UserListComponent,
    ChatFormComponent,
    FeedComponent,
    MessageComponent,
    ChatroomComponent,
    UserItemComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFirestoreModule,
    AngularFireAuthModule,
    AngularFontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forRoot(
      appRoutes,
      { enableTracing: true } // <-- debugging purposes only
    ),
    AngularFireStorageModule,
    FullCalendarModule,
    AngularFireDatabaseModule,
    DragDropModule
  ],
  providers: [
    AuthService,
    UploadService,
    ChatService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
