import Button from "@/components/ui/Button";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#0D1117] flex items-center justify-center">
      <div className="text-center">
        <h2 className="text-2xl font-bold text-white mb-4">Post not found</h2>
        <Button variant="secondary">Back to Home</Button>
      </div>
    </div>
  );
}
