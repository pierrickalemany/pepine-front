export function Buttons({ handleReset, handleCancel, handleSubmit }) {
  return (
    <div className="mt-6 flex items-center justify-between gap-x-6">
      <div>
        <button
          onClick={handleReset}
          className="text-sm font-semibold leading-6 text-white bg-blue-400 hover:bg-blue-400 px-3 py-2 rounded-md shadow-sm"
          href=""
        >
          Reset
        </button>
      </div>
      <div>
        <button
          type="button"
          onClick={handleCancel}
          className="text-sm font-semibold leading-6 mr-2 text-gray-900"
        >
          Annuler
        </button>
        <button
          type="submit"
          onClick={handleSubmit}
          className="rounded-md bg-amber-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-amber-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Valider
        </button>
      </div>
    </div>
  );
}
