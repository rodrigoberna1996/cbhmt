// src/data/servicios.ts

export interface Servicio {
    id: string;
    titulo: string;
    descripcion: string;
    imagen: string;
  }
  
  export const servicios: Servicio[] = [
    {
      id: "mechanical-design",
      titulo: "Diseño mecánico",
      descripcion:
        "CBH Mechatooling cuenta con más de 12 años de experiencia en el diseño integral de herramentales llave en mano para la industria automotriz, desde la conceptualización hasta la implementación en planta, asegurando soluciones precisas, eficientes y de alta calidad.",
      imagen: "../assets/img/service/diseno.jpg",
    },
    {
      id: "engineering-changes",
      titulo: "Cambios de ingeniería",
      descripcion:
        "Mejoramos tus herramentales para ofrecer un mejor rendimiento mejorando el proceso productivo, mediante el análisis del modelo CAD y adaptamos tus herramentales ante cambios de diseño de producto final.",
      imagen: "/assets/img/cambios-ingenieria.jpg",
    },
    {
      id: "integration-services",
      titulo: "Integración",
      descripcion:
        "Integramos soluciones industriales mediante diseño y automatización, garantizando compatibilidad entre sistemas y eficiencia operativa.",
      imagen: "/assets/img/integracion.jpg",
    },
  ];
  