import { requireAdminUser } from "@/lib/admin/auth";
import { listAdminUsers } from "@/lib/admin/admin-users";

function SuccessBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-green-500/20 bg-green-500/10 px-4 py-3 text-sm text-green-200">
      {message}
    </div>
  );
}

function ErrorBanner({ message }: { message: string }) {
  return (
    <div className="rounded-2xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-200">
      {message}
    </div>
  );
}

function getSuccessMessage(success?: string) {
  switch (success) {
    case "admin-created":
      return "Admin creado correctamente.";
    case "admin-updated":
      return "Admin actualizado correctamente.";
    case "admin-activated":
      return "Admin activado correctamente.";
    case "admin-deactivated":
      return "Admin desactivado correctamente.";
    default:
      return null;
  }
}

function getErrorMessage(error?: string) {
  switch (error) {
    case "missing-email":
      return "Debes capturar un correo.";
    case "create-admin":
      return "No se pudo crear el admin.";
    case "invalid-admin-id":
      return "ID de admin invalido.";
    case "admin-not-found":
      return "Admin no encontrado.";
    case "update-admin":
      return "No se pudo actualizar el admin.";
    case "toggle-admin":
      return "No se pudo cambiar el estado del admin.";
    case "cannot-deactivate-self":
      return "No puedes desactivarte a ti mismo.";
    case "missing-deactivate-confirmation":
      return "Debes marcar la confirmacion para desactivar el admin.";
    case "wrong-deactivate-email":
      return "El correo de confirmacion no coincide exactamente.";
    default:
      return null;
  }
}

export default async function AdminUsersPage({
  searchParams,
}: {
  searchParams: Promise<{ success?: string; error?: string }>;
}) {
  const currentAdmin = await requireAdminUser();
  const params = await searchParams;
  const admins = await listAdminUsers();

  const successMessage = getSuccessMessage(params.success);
  const errorMessage = getErrorMessage(params.error);

  return (
    <section className="space-y-6">
      <div>
        <p className="text-xs uppercase tracking-[0.28em] text-white/50">
          Admin users
        </p>
        <h2 className="mt-2 text-3xl font-semibold text-white">
          Gestion de admins
        </h2>
        <p className="mt-2 text-white/65">
          Todos los usuarios aqui son admin total.
        </p>
      </div>

      {successMessage && <SuccessBanner message={successMessage} />}
      {errorMessage && <ErrorBanner message={errorMessage} />}

      <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-5">
        <h3 className="mb-4 text-lg font-semibold text-white">Agregar admin</h3>

        <form
          action="/api/admin/admin-users/create"
          method="post"
          className="grid gap-4 lg:grid-cols-[1.2fr_1fr_auto]"
        >
          <input
            name="email"
            type="email"
            placeholder="correo@dominio.com"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
            required
          />

          <input
            name="notes"
            type="text"
            placeholder="Nota opcional"
            className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
          />

          <button
            type="submit"
            className="rounded-2xl bg-white px-5 py-3 text-sm font-medium text-black transition hover:bg-white/90"
          >
            Crear admin
          </button>
        </form>
      </div>

      <div className="grid gap-5">
        {admins.map((admin) => (
          <article
            key={admin.id}
            className="rounded-3xl border border-white/10 bg-white/[0.03] p-5"
          >
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <p className="text-lg font-semibold text-white">{admin.email}</p>
                <p className="mt-1 text-sm text-white/50">
                  Rol: {admin.role} | Estado: {admin.is_active ? "Activo" : "Inactivo"}
                </p>
                <p className="mt-1 text-sm text-white/40">
                  Creado: {new Date(admin.created_at).toLocaleString()}
                </p>
              </div>

              <div className="text-sm text-white/45">
                {admin.email.toLowerCase() === currentAdmin.email.toLowerCase()
                  ? "Tu usuario actual"
                  : ""}
              </div>
            </div>

            <form
              action="/api/admin/admin-users/update"
              method="post"
              className="mt-5 grid gap-4 lg:grid-cols-[1fr_auto]"
            >
              <input type="hidden" name="id" value={admin.id} />
              <input
                name="notes"
                type="text"
                defaultValue={admin.notes ?? ""}
                placeholder="Nota interna"
                className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
              />
              <button
                type="submit"
                className="rounded-2xl border border-white/10 px-5 py-3 text-sm text-white/85 transition hover:bg-white/[0.04]"
              >
                Guardar nota
              </button>
            </form>

            <form
              action="/api/admin/admin-users/toggle-active"
              method="post"
              className="mt-4 space-y-3"
            >
              <input type="hidden" name="id" value={admin.id} />

              {!admin.is_active ? (
                <button
                  type="submit"
                  className="rounded-2xl border border-green-500/20 bg-green-500/10 px-5 py-3 text-sm text-green-200 transition hover:bg-green-500/15"
                >
                  Activar admin
                </button>
              ) : (
                <>
                  <label className="flex items-center gap-2 text-sm text-white/70">
                    <input
                      type="checkbox"
                      name="confirm_toggle"
                      value="yes"
                      disabled={admin.email.toLowerCase() === currentAdmin.email.toLowerCase()}
                    />
                    Confirmo que quiero desactivar este admin
                  </label>

                  <div className="space-y-2">
                    <label className="block text-sm text-white/70">
                      Escribe exactamente este correo para confirmar:
                    </label>
                    <p className="text-sm font-medium text-white">{admin.email}</p>
                    <input
                      name="confirm_email"
                      type="text"
                      placeholder={admin.email}
                      disabled={admin.email.toLowerCase() === currentAdmin.email.toLowerCase()}
                      className="w-full rounded-2xl border border-white/10 bg-white/[0.04] px-4 py-3 text-white outline-none"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={admin.email.toLowerCase() === currentAdmin.email.toLowerCase()}
                    className={`rounded-2xl border border-red-500/20 bg-red-500/10 px-5 py-3 text-sm text-red-200 transition hover:bg-red-500/15 ${
                      admin.email.toLowerCase() === currentAdmin.email.toLowerCase()
                        ? "cursor-not-allowed opacity-50"
                        : ""
                    }`}
                  >
                    Desactivar admin
                  </button>
                </>
              )}
            </form>
          </article>
        ))}
      </div>
    </section>
  );
}