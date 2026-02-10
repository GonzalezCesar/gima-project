
//Encargado de la generacion de las filas dentro de la tabla de UserTable

// Importamos la plantilla de Usuario, "User" la tendra
import { User } from '../../types/user';

//Un Uusario recibira la estructura asignada, mas la capacidad de realizar dos funciones
interface UserRowProps {
    user: User;

    //Funcion del UserTable, recibe una Id, devuelve nada
    onEliminar: (id: string) => void;

    //Funcion del UserTable, recibe un Usuario, devuelve nada
    onEditar: (user: User) => void; // Agregar esta prop
}

//Funcion usada en UserTable, requiere un Usuario dado por la interfaz "UserRowProps"
export default function UserRow({ user, onEliminar, onEditar }: UserRowProps) {
    //Retornamos el HTML
    return (
        //Fila de la tabla, utilizando Tailwind
        <tr className="border-b hover:bg-gray-50">
            {/* Columna USUARIO */}
            <td className="p-4">
                {/*Contenedor Flex*/}
                <div className="flex items-center">
                    {/* Avatar con iniciales */}
                    <div className="h-10 w-10 rounded-full flex items-center justify-center font-bold" style={{ backgroundColor: "#F0FDFA", color: "#0B2545" }}>
                        {user.iniciales}
                    </div>
                    {/*Nombre y Email*/}
                    <div className="ml-4">
                        <div className="font-medium text-gray-900">{user.name}</div>
                        <div className="text-gray-500">{user.email}</div>
                    </div>
                </div>
            </td>

            {/* Columna ROL */}
            <td className="p-4 text-center">{user.rol}</td>

            {/* Columna DEPARTAMENTO */}
            <td className="p-4 text-center" >
                <div className=" text-white py-1 rounded-lg" style={{ backgroundColor: "lightgray",   }}>
                    <span className=" py-1 rounded-full text-black" > {user.department} </span>
                </div>
            </td>

            {/* Columna ESTADO */}
            <td className="p-4 text-center">
                {/*Dependiendo del String brindado, este sera rodeado en verde o rojo*/}
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${user.status === 'available' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {user.status}
                </span>
            </td>

            {/* Columna ACCIÓN */}
            <td className="p-4 text-center">
                <button
                    //Llama a la funcion de UserTable, enviando el User
                    onClick={() => onEditar(user)}
                    className="text-blue-600 hover:text-blue-900 mr-2"
                >
                    Editar
                </button>
                <button
                    className="text-red-600 hover:text-red-900"
                    //Llama a la funcion de UserTable, enviando el ID del User
                    onClick={() => onEliminar(user.id)}
                >
                    Eliminar
                </button>
            </td>
        </tr>
    );
}