const UsersControllers = {


    controllerTest: (res) => {
        res.write("Hello from the controller");
        res.end();
    },
    controllerChild: (res) => {
        res.write("Hello from the controller child");
        res.end();
    },
    controllerChildDelete: (res) => {
        res.write("bye bye child");
        res.end();
    }



    
}

export default UsersControllers;