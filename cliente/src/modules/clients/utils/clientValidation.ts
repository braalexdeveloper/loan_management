import type { ClientI } from "../interfaces/ClientI";

export const validateField = (name: string, value: string) => {
        let error = "";

        switch (name) {
            case "name":
                if (!value.trim()) {
                    error = "El nombre es obligatorio";
                }
                break;

            case "lastName":
                if (!value.trim()) {
                    error = "El apellido es obligatorio";
                }
                break;

            case "dni":
                if (!value.trim()) {
                    error = "El DNI es obligatorio";
                } else if (!/^\d{8}$/.test(value)) {
                    error = "El DNI debe tener 8 dígitos";
                }
                break;

            case "email":
                if (!value.trim()) {
                    error = "El correo es obligatorio";
                } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
                    error = "El correo no es válido";
                }
                break;

            case "phone":
                if (!value.trim()) {
                    error = "El teléfono es obligatorio";
                }
                break;

            case "address":
                if (!value.trim()) {
                    error = "La dirección es obligatoria";
                }
                break;
        }

        return error;
    };

    export const validateClient = (client:ClientI) => {
        const newErrors: Record<string, string> = {};
        Object.entries(client).forEach(([name, value]) => {
            const error = validateField(name, value);
            if (error) {
                newErrors[name] = error
            }

        })
        console.log(newErrors)
        

        return Object.keys(newErrors).length === 0;
    }