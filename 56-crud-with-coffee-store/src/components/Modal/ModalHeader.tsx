interface IModalHeaderProps {
  editingId: string | null;
}

export default function ModalHeader({ editingId }: IModalHeaderProps) {
  return (
    <div className="text-center">
      <h3 className="text-4xl font-bold">
        {editingId ? 'Update Existing Coffee Details' : 'Add New Coffee'}
      </h3>
      <p className="py-4 max-w-[900px] mx-auto">
        It is a long established fact that a reader will be distracted by the
        readable content of a page when looking at its layout.
      </p>
    </div>
  );
}
