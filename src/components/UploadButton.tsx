import { UploadDropzone } from "@uploadthing/react"
import { Button } from "./ui/button"
import { Dialog, DialogContent, DialogTrigger } from "./ui/dialog"
import { useState } from "react"

const UploadButton = ({
    isSubscribed,
  }: {
    isSubscribed: boolean
  }) => {
    const [isOpen, setIsOpen] = useState<boolean>(false)

return (
    <Dialog
      open={isOpen}
      onOpenChange={(v) => {
        if (!v) {
          setIsOpen(v)
        }
      }}>
      <DialogTrigger
        onClick={() => setIsOpen(true)}
        asChild>
        <Button>Upload PDF</Button>
      </DialogTrigger>

      <DialogContent>
        {/* <UploadDropzone isSubscribed={isSubscribed} /> */}
      </DialogContent>
    </Dialog>
  )
}

export default UploadButton