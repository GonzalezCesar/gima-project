import { X, Package, Calendar, Clock } from "lucide-react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function FormularioRepuestos({ isOpen, onClose }: ModalProps) { 
  // 1. Si el "interruptor" está apagado, no mostramos nada
  if (!isOpen) return null;

  // 2. Si el interruptor está encendido, mostramos esto para probar
  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-[100]">
      <div className="bg-white p-10 rounded-2xl shadow-xl text-center">
        <h1 className="text-2xl font-bold text-blue-600 mb-4">
          ¡CONEXIÓN EXITOSA!
        </h1>
        <p className="text-gray-600 mb-6">
          Si ves esto, el botón en page.tsx funciona correctamente. <br />
          Chicos, aquí pueden empezar a maquetar el formulario.
        </p>
        <button 
          onClick={onClose}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Cerrar prueba
        </button>
      </div>
    </div>
  );
}