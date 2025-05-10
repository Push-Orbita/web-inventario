interface BackendResponse {
  nombre: string;
  email: string;
  persona: {
    nombre: string;
    apellido: string;
  };
  permiso: {
    organizacion: {
      nombre: string;
    };
  }[];
  userModulos: {
    modulos: ModuloBackend[];
  };
  tokens: {
    access_token: string;
  };
}

interface ModuloBackend {
  nombre: string;
  label: string;
  path: string;
  icon: string;
  element: string;
  acciones: { descripcion: string }[];
  children: ModuloBackend[];
}

interface FrontendData {
  userNombre: string;
  userEmail: string;
  tokenUser: string;
  organizacion: string;
  sistema: string;
  activo: boolean;
  userModulos: FrontendModule[];
}

interface FrontendModule {
  label: string;
  items: FrontendModuleItem[];
}

interface FrontendModuleItem {
  label: string;
  icon: string;
  to: string;
  path: string;
  acciones: string[];
  element: string;
}

export const transformResponse = (backendData: BackendResponse): FrontendData | null => {
  if (!backendData) {
    return null; // o un objeto vacío, dependiendo de lo que necesites
  }

  const { persona, permiso, userModulos, tokens, email } = backendData;

  // 1. Construir el nombre completo del usuario
  const userNombre = `${persona.apellido} ${persona.nombre}`;
  // 2. Extraer el email del usuario
  const userEmail = email || '';

  // 3. Extraer la organización
  const organizacion = permiso[0]?.organizacion?.nombre || '';

  // 4. Construir los módulos para el frontend de manera recursiva
  const transformModulos = (modulos: ModuloBackend[]): FrontendModuleItem[] => {
    return modulos?.map(modulo => ({
      label: modulo.label,
      icon: modulo.icon,
      to: modulo.path,
      path: modulo.path,
      acciones: modulo.acciones?.map(accion => accion.descripcion) || [],
      element: modulo.element,
      ...(modulo.children && modulo.children.length > 0 ? { items: transformModulos(modulo.children) } : {})
    })) || [];
  };

  const frontendModulos: FrontendModule[] = [
    {
      label: permiso[0]?.organizacion?.nombre || '',
      items: transformModulos(userModulos.modulos || [])
    }
  ];

  // 5. Construir el objeto final
  const transformedData: FrontendData = {
    userNombre,
    userEmail,
    tokenUser: tokens.access_token,
    organizacion,
    sistema: userModulos?.modulos?.[0]?.nombre || 'Sistema desconocido',
    activo: true,
    userModulos: frontendModulos
  };

  return transformedData;
};