import type { APIRoute } from "astro";

const MECHATOOLING_ENDPOINT = "https://mechatooling.com.mx/api/v1/send-email/send-email";
const RECAPTCHA_VERIFY_URL = "https://www.google.com/recaptcha/api/siteverify";
const RECAPTCHA_MIN_SCORE = Number(import.meta.env.RECAPTCHA_MIN_SCORE ?? "0.5");
const RECAPTCHA_SECRET_KEY = import.meta.env.RECAPTCHA_SECRET_KEY;

export const POST: APIRoute = async ({ request, clientAddress }) => {
  if (!RECAPTCHA_SECRET_KEY) {
    return new Response(
      JSON.stringify({
        success: false,
        message: "Falta configurar la variable RECAPTCHA_SECRET_KEY en el servidor."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }

  try {
    const formData = await request.formData();
    const token = formData.get("recaptchaToken");

    if (!token || typeof token !== "string") {
      return new Response(
        JSON.stringify({
          success: false,
          message: "Token de reCAPTCHA inválido."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    const verificationPayload = new URLSearchParams();
    verificationPayload.append("secret", RECAPTCHA_SECRET_KEY);
    verificationPayload.append("response", token);

    if (clientAddress) {
      verificationPayload.append("remoteip", clientAddress);
    }

    const verificationResponse = await fetch(RECAPTCHA_VERIFY_URL, {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: verificationPayload
    });

    if (!verificationResponse.ok) {
      throw new Error("No se pudo verificar reCAPTCHA.");
    }

    const verificationResult = await verificationResponse.json();
    const score = typeof verificationResult.score === "number" ? verificationResult.score : 1;

    if (!verificationResult.success || score < RECAPTCHA_MIN_SCORE) {
      return new Response(
        JSON.stringify({
          success: false,
          message: "La validación de seguridad falló. Inténtelo nuevamente."
        }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" }
        }
      );
    }

    formData.delete("recaptchaToken");

    const forwardResponse = await fetch(MECHATOOLING_ENDPOINT, {
      method: "POST",
      body: formData
    });

    if (!forwardResponse.ok) {
      throw new Error("El servidor externo rechazó la solicitud.");
    }

    return new Response(
      JSON.stringify({
        success: true,
        message: "¡Mensaje enviado con éxito!"
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json" }
      }
    );
  } catch (error) {
    console.error("Error enviando el formulario de contacto:", error);
    return new Response(
      JSON.stringify({
        success: false,
        message: "Error interno al enviar el formulario."
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" }
      }
    );
  }
};
