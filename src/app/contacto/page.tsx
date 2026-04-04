"use client";

import { useState } from 'react';

export default function ContactoPage() {
  const [form, setForm] = useState({ nombre: '', email: '', mensaje: '' });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <div className="bg-black min-h-screen">
      <div className="bg-[#0a0a0a] border-b border-[#222] py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <p className="text-red-600 text-xs tracking-[0.4em] uppercase mb-3">Hablemos</p>
          <h1 className="text-white font-bold text-4xl md:text-5xl tracking-tight">Contacto</h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          {/* Form */}
          <div>
            <h2 className="text-white font-bold text-xl mb-6">Formulario de Contacto</h2>
            {sent ? (
              <div className="bg-[#111] border border-red-600/30 p-8 text-center">
                <p className="text-red-600 text-xs tracking-widest uppercase mb-2">Enviado</p>
                <p className="text-white font-medium mb-2">¡Mensaje recibido!</p>
                <p className="text-[#888] text-sm">Te contactaremos a la brevedad.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="text-[#888] text-xs tracking-widest uppercase block mb-2">Nombre</label>
                  <input
                    type="text"
                    required
                    value={form.nombre}
                    onChange={e => setForm({ ...form, nombre: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="Tu nombre"
                  />
                </div>
                <div>
                  <label className="text-[#888] text-xs tracking-widest uppercase block mb-2">Email</label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={e => setForm({ ...form, email: e.target.value })}
                    className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors"
                    placeholder="tu@email.com"
                  />
                </div>
                <div>
                  <label className="text-[#888] text-xs tracking-widest uppercase block mb-2">Mensaje</label>
                  <textarea
                    required
                    value={form.mensaje}
                    onChange={e => setForm({ ...form, mensaje: e.target.value })}
                    rows={5}
                    className="w-full bg-[#111] border border-[#222] text-white px-4 py-3 text-sm focus:border-red-600 focus:outline-none transition-colors resize-none"
                    placeholder="¿En qué te podemos ayudar?"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-red-600 hover:bg-red-700 text-white py-4 text-xs tracking-[0.2em] uppercase font-medium transition-all duration-300"
                >
                  Enviar Mensaje
                </button>
              </form>
            )}
          </div>

          {/* Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-white font-bold text-xl mb-6">Contacto Directo</h2>
              <a
                href="https://wa.me/521XXXXXXXXXX?text=Hola,%20me%20interesa%20saber%20m%C3%A1s%20sobre%20Salva%20Exclusive%20Caps"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 bg-[#111] border border-[#222] hover:border-red-600 p-5 transition-all duration-300 group"
              >
                <div className="w-10 h-10 bg-green-600 flex items-center justify-center flex-shrink-0">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="white">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
                  </svg>
                </div>
                <div>
                  <p className="text-white font-medium text-sm">WhatsApp</p>
                  <p className="text-[#888] text-xs group-hover:text-red-600 transition-colors">Respuesta inmediata</p>
                </div>
              </a>
            </div>

            <div>
              <h3 className="text-white text-xs tracking-widest uppercase mb-4">Ubicación</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Tampico, Tamaulipas<br />
                México
              </p>
            </div>

            <div>
              <h3 className="text-white text-xs tracking-widest uppercase mb-4">Horario</h3>
              <p className="text-[#888] text-sm leading-relaxed">
                Lunes a Viernes: 10:00 — 19:00<br />
                Sábado: 10:00 — 15:00
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
