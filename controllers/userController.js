const formularoLogin =(request,response) =>{
    response.render("auth/login",{
    
    page :'Login'
    })
}

const formularioRegister = (request,response) =>{
    response.render("auth/createAccount",{
        page :'Formulario de registro'

    })
}

const formularioPasswordRecovery = (request,response) =>{
    response.render("auth/passwordRecovery",{
    page :'Recuperar contraseña'

    })
}

const createNewUser = async (req, res) => {
    // Validación de los campos que se reciben del formulario
    await check('name').notEmpty().withMessage('El nombre no puede ir vacío').run(req);
    await check('correo_usuario')
        .notEmpty().withMessage('El correo electrónico es un campo obligatorio')
        .isEmail().withMessage('El correo electrónico no tiene el formato correcto')
        .run(req);
    await check('pass_usuario')
        .notEmpty().withMessage('La contraseña es un campo obligatorio')
        .isLength({ min: 8 }).withMessage('El Password debe ser de al menos 8 caracteres')
        .run(req);
    await check('pass2_usuario')
        .equals(req.body.pass_usuario).withMessage('La contraseña debe coincidir con la anterior')
        .run(req);

    let resultado = validationResult(req);

    // Verificamos que el resultado esté vacío
    if (!resultado.isEmpty()) {
        // Errores
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: resultado.array(),
            User:{
                name:req.body.name,
                email:req.body.correo_usuario
            }
        });
    } else {
        console.log('Registrando a un Nuevo Usuario...');
        console.log(req.body);
    }

    const { name, correo_usuario: email, pass_usuario: password } = req.body;

    // Verificamos que el usuario no existe previamente en la BD
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
        return res.render('auth/register', {
            page: 'Error al intentar crear una cuenta',
            csrfToken: req.csrfToken(),
            errors: [{ msg: 'El usuario ya está registrado' }],
            User:{
                name:req.body.name,
                email:req.body.correo_usuario
            }
        });
    }
    
    // Registramos los datos en la BD
    const newUser =await User.create({
        name,
        email,
        password, 
        token:generateId()
    });
    //Envia un email de confirmacion 
    registerEmail({
        name: newUser.name,
        email: newUser.email,
        token: newUser.token
    }) 

    
    //Mostrar mensaje de confirmación 
    res.render('templates/message',{
        page:'Cuenta Creada Correctamente',
        msg:`Hemos Enviado un Email de Confirmación a  ${email}, presione en el enlace`
    })
};
//Funcion que comprueba una cuenta 
const confirm=async (req,res)=>{

    const {token}=req.params;
    //Verificamos si el token es valido
    const user= await User.findOne({where:{token}})
    if(!user){
        return res.render('auth/confirmAccount',{
            page:'Error al confirmar tu cuenta...',
            msg:'Hubo un error al confirmar tu cuenta, intenta de nuevo..',
            error:true
        })
    }

    // Confirmar Cuenta
    user.token=null;
    user.confirmed=true;
    await user.save();
    res.render('auth/confirmAccount',{
        page:'Cuenta Confirmada',
        msg:'La cuenta se ha confirmado Correctamente ',
        error:false
    })
}


export{formularoLogin,formularioRegister,formularioPasswordRecovery,
    createNewUser,
    confirm,
    
}