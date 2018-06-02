import {Component, OnInit} from '@angular/core';
import {NodeJsClientService} from './nodejs-client.service';
import {User} from './nodejs-client.models';

@Component({
    selector: 'nodejs-client',
    moduleId: module.id,
    templateUrl: 'nodejs-client.component.html',
})

export class NodeJsComponent implements OnInit {

    firstName: string;
    newUser: User;

    constructor(private nodeJsClientService: NodeJsClientService) {

    }

    users: User[];

    ngOnInit(): void {
        this.newUser = {id: "", first_name: "", last_name: "", email: ""};

        this.getAllUsers();
    }

    getAllUsers() {
        this.nodeJsClientService.getAllUsers().subscribe((arrivedData: User[]) => {
            this.populateUsers(arrivedData);
        });
    }

    updateUser(user: User){

        this.nodeJsClientService.updateUser(user).subscribe((arrivedData: User) => {
            toastr.success(`Updated User<br/>First Name: ${user.first_name}<br/>Last Name: ${user.last_name}<br/>Email: ${user.email}`, 'User Updated', {timeOut: 5000});
            this.getAllUsers();
        });
    }

    deleteUser(user: User){
        this.nodeJsClientService.deleteUser(user).subscribe((arrivedData: User) => {
            toastr.success(`Deleted User<br/>First Name: ${user.first_name}<br/>Last Name: ${user.last_name}<br/>Email: ${user.email}`, 'User Removed', {timeOut: 5000});
            this.getAllUsers();
        });
    }

    populateUsers(users: User[]) {
        this.users = users
    }

    displayUser(user: User) {
        toastr.options.showMethod = 'slideDown';
        // toastr.options.showEasing = 'easeOutBounce';
        toastr.options.timeOut = 120; // How long the toast will display without user interaction
        toastr.options.extendedTimeOut = 60; // How long the toast will display after a user hovers over it
        // toastr.success("this is a test");
        if (!user || !user.first_name) {
            toastr.error(`User not found - try again`, 'User Details', {timeOut: 5000});
        }
        else {
            toastr.info(`First Name: ${user.first_name}<br/>Last Name: ${user.last_name}<br/>Email: ${user.email}`, 'User Details', {timeOut: 5000});
        }
    }

    searchSpecificUser() {
        this.nodeJsClientService.getUserByFirstName(this.firstName).subscribe((arrivedData: User) => {
            this.displayUser(arrivedData);
        });
    }

    createNewUser() {

        if(!this.newUser.last_name || !this.newUser.first_name)
            return;

        this.nodeJsClientService.createNewUser(this.newUser).subscribe((arrivedData: User) => {
            this.displayUser(arrivedData);
            this.getAllUsers();
            this.newUser.email = "";
            this.newUser.first_name = "";
            this.newUser.last_name = "";
        });
    }
}