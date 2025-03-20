// "use client";

// import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
// import { Button } from "@heroui/button";
// import { Form } from "@heroui/form";
// import { Input, Textarea } from "@heroui/input";
// import { Image } from "@heroui/image";
// import {
//   Modal,
//   ModalBody,
//   ModalContent,
//   ModalFooter,
//   ModalHeader,
//   useDisclosure,
// } from "@heroui/modal";
// import { addToast, ToastProvider } from "@heroui/toast";
// import axios from "axios";
// import { FormEvent, useEffect, useState } from "react";
// import "./style.css";

// const animals = [
//   {
//     label: "Cat",
//     key: "cat",
//     description: "The second most popular pet in the world",
//   },
//   {
//     label: "Dog",
//     key: "dog",
//     description: "The most popular pet in the world",
//   },
//   {
//     label: "Elephant",
//     key: "elephant",
//     description: "The largest land animal",
//   },
//   { label: "Lion", key: "lion", description: "The king of the jungle" },
//   { label: "Tiger", key: "tiger", description: "The largest cat species" },
//   { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
//   {
//     label: "Dolphin",
//     key: "dolphin",
//     description: "A widely distributed and diverse group of aquatic mammals",
//   },
//   {
//     label: "Penguin",
//     key: "penguin",
//     description: "A group of aquatic flightless birds",
//   },
//   {
//     label: "Zebra",
//     key: "zebra",
//     description: "A several species of African equids",
//   },
//   {
//     label: "Shark",
//     key: "shark",
//     description:
//       "A group of elasmobranch fish characterized by a cartilaginous skeleton",
//   },
//   {
//     label: "Whale",
//     key: "whale",
//     description: "Diverse group of fully aquatic placental marine mammals",
//   },
//   {
//     label: "Otter",
//     key: "otter",
//     description: "A carnivorous mammal in the subfamily Lutrinae",
//   },
//   {
//     label: "Crocodile",
//     key: "crocodile",
//     description: "A large semiaquatic reptile",
//   },
// ];

// interface ProductPayload {
//   productName: string;
//   description: string;
//   basePrice: string; // or number if you want to parse it
//   stockQuantity: number | null;
//   category: string;
//   brand: string;
//   sku: string;
//   thumbnailUrl: string;
//   images: string[] | null;
//   pricePerQuantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
// }

// interface ImageFile {
//   base64String: string;
//   fileName: string;
//   file: File | null;
// }

// interface AddProductPageProps {
//   openModal: boolean;
//   fetchProductsCallback: () => void;
//   setOpenModal: (val: boolean) => void;
// }

// export default function AddProductPage({
//   openModal,
//   fetchProductsCallback,
//   setOpenModal,
// }: Readonly<AddProductPageProps>) {
//   //   const [productList, setProductList] = useState<Product[]>([]);
//   const [isLoading, setIsLoading] = useState<boolean>(false);
//   const [enableAddImage, setEnableAddImage] = useState<boolean>(false);
//   const [productData, setProductData] = useState<ProductPayload>({
//     productName: "",
//     category: "",
//     sku: "",
//     brand: "",
//     basePrice: "",
//     stockQuantity: null,
//     thumbnailUrl: "",
//     images: null,
//     description: "",
//     pricePerQuantity: {},
//   });
//   //   const [imageUrls, setImageUrls] = useState<ImageResponse[]>();
//   //   const [images, setImages] = useState<ImageResponse[]>();
//   //   const [imagePreviewUrls, setImagePreviewUrls] = useState<string>("");
//   //   const [uploading, setUploading] = useState(false);
//   //   const [uploadError, setUploadError] = useState<string | null>(null);
//   //   const [fetchError, setFetchError] = useState<string | null>(null);
//   const [selectedFiles, setSelectedFiles] = useState<ImageFile[]>([
//     {
//       base64String: "",
//       file: null,
//       fileName: "",
//     },
//   ]);
//   const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

//   //   const fetchProducts = async (): Promise<Product[]> => {
//   //     const response = await axios.get("/api/products");
//   //     return response.data;
//   //   };

//   useEffect(() => {
//     if (openModal) {
//       onOpen();
//     }
//   });

//   const onAddProduct = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     setIsLoading(true);
//     console.log("Product Data: ", productData);

//     axios.post("/api/products", productData).then((response) => {
//       if (response.data) {
//         addToast({
//           title: "Saved",
//           description: "Product saved successfully",
//         });
//         setIsLoading(false);
//         onClose();
//         // fetchProducts().then((response) => {
//         //   const products = response;
//         //   setProductList(products);
//         // });
//         fetchProductsCallback();
//       }
//     });
//   };

//   const handleFileChange = (
//     event: React.ChangeEvent<HTMLInputElement>,
//     index: number
//   ) => {
//     if (event.target.files && event.target.files.length > 0) {
//       setSelectedFiles(
//         selectedFiles.map((file, i) => {
//           if (i === index) {
//             return {
//               ...file,
//               file: event.target.files?.[0] ?? null,
//               base64String: URL.createObjectURL(
//                 event.target.files?.[0] ?? ({} as Blob)
//               ),
//               fileName: event.target.files?.[0].name ?? "",
//             };
//           } else {
//             return { ...file };
//           }
//         })
//       );
//     }
//   };

//   useEffect(() => {
//     if (selectedFiles.length) {
//       selectedFiles.forEach((file, index) => {
//         if (file.fileName) {
//           const fileInput = document.getElementById(
//             `imageUpload${index.toString()}`
//           ) as HTMLInputElement;

//           // Now let's create a DataTransfer to get a FileList
//           const dataTransfer = new DataTransfer();
//           dataTransfer.items.add(file.file ?? ({} as File));
//           if (fileInput) {
//             fileInput.files = dataTransfer.files;
//           }
//         }
//       });
//     }
//     if (selectedFiles[selectedFiles.length - 1].fileName) {
//       setEnableAddImage(true);
//     } else {
//       setEnableAddImage(false);
//     }
//   });

//   const handleAddImage = () => {
//     if (selectedFiles[selectedFiles.length - 1].fileName) {
//       setSelectedFiles((prev) => [
//         ...prev,
//         {
//           base64String: "",
//           file: null,
//           fileName: "",
//           isValid: false,
//         },
//       ]);
//     }
//   };

//   const handleDelete = async (index: number) => {
//     setSelectedFiles(selectedFiles.filter((file, i) => i !== index));
//     const fileInput = document.getElementById(
//       `imageUpload${index.toString()}`
//     ) as HTMLInputElement;
//     fileInput.value = "";
//     fileInput.files = null;
//   };

//   const onCloseModal = () => {
//     setOpenModal(false);
//     onClose();
//   };

//   return (
//     <>
//       <div>
//         <Modal
//           isOpen={isOpen}
//           placement="center"
//           onOpenChange={onOpenChange}
//           size="4xl"
//           scrollBehavior="inside"
//         >
//           <ModalContent>
//             {(onCloseModal) => (
//               <Form className="w-full overflow-auto" onSubmit={onAddProduct}>
//                 <ModalHeader className="flex flex-col gap-1 font-semibold">
//                   Add Product
//                 </ModalHeader>
//                 <ModalBody className="w-full">
//                   <div className="w-full grid grid-cols-2 gap-4">
//                     <div className="w-full flex items-center justify-start">
//                       <Input
//                         labelPlacement="outside"
//                         placeholder="Name"
//                         variant="bordered"
//                         label="Name"
//                         isRequired={true}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             productName: e.target.value,
//                           }))
//                         }
//                         defaultValue={productData.productName}
//                       />
//                     </div>
//                     <div className="w-full flex items-center justify-start">
//                       <Autocomplete
//                         label="Category"
//                         placeholder="Category"
//                         labelPlacement="outside"
//                         isClearable={false}
//                         fullWidth
//                         onSelectionChange={(value) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             category: value ? value.toString() : "",
//                           }))
//                         }
//                         isRequired={true}
//                         defaultInputValue={productData.category}
//                       >
//                         {animals.map((animal) => (
//                           <AutocompleteItem key={animal.key}>
//                             {animal.label}
//                           </AutocompleteItem>
//                         ))}
//                       </Autocomplete>
//                     </div>
//                     <div className="w-full flex items-center justify-start">
//                       <Input
//                         labelPlacement="outside"
//                         placeholder="SKU"
//                         variant="bordered"
//                         label="SKU"
//                         isRequired={true}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             sku: e.target.value,
//                           }))
//                         }
//                         defaultValue={productData.sku}
//                       />
//                     </div>
//                     <div className="w-full flex items-center justify-start">
//                       <Input
//                         labelPlacement="outside"
//                         placeholder="Brand"
//                         variant="bordered"
//                         label="Brand"
//                         isRequired={false}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             brand: e.target.value,
//                           }))
//                         }
//                         defaultValue={productData.brand}
//                       />
//                     </div>
//                     <div className="w-full flex items-center justify-start">
//                       <Input
//                         labelPlacement="outside"
//                         placeholder="Base Price"
//                         variant="bordered"
//                         label="Base Price"
//                         type="number"
//                         isRequired={true}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             basePrice: e.target.value,
//                           }))
//                         }
//                         defaultValue={productData.basePrice}
//                       />
//                     </div>
//                     <div className="w-full flex items-center justify-start">
//                       <Input
//                         labelPlacement="outside"
//                         placeholder="Stock Quantity"
//                         variant="bordered"
//                         label="Stock Quantity"
//                         type="number"
//                         isRequired={true}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             stockQuantity: parseInt(e.target.value),
//                           }))
//                         }
//                         defaultValue={productData.stockQuantity?.toString()}
//                       />
//                     </div>
//                     <div className="w-full flex flex-col items-start justify-center gap-2 col-span-2">
//                       <div>Images</div>
//                       {selectedFiles?.map((file, index) => {
//                         return (
//                           <div
//                             className="w-full grid grid-cols-2 gap-4"
//                             key={file.fileName}
//                           >
//                             <div className="w-full flex items-center justify-start gap-2">
//                               <Input
//                                 type="file"
//                                 accept="image/*"
//                                 id={`imageUpload${index.toString()}`}
//                                 onChange={(e) => handleFileChange(e, index)}
//                                 color="primary"
//                                 isRequired={false}
//                                 classNames={{
//                                   inputWrapper: "h-[3rem] cursor-pointer",
//                                   input: "cursor-pointer",
//                                 }}
//                                 fullWidth
//                               />
//                             </div>
//                             <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
//                               <div>
//                                 {file.base64String && (
//                                   <Image
//                                     src={file.base64String}
//                                     alt={`Uploaded Image`}
//                                     style={{ maxWidth: "200px" }}
//                                     height={"3rem"}
//                                   />
//                                 )}
//                               </div>
//                               {selectedFiles.length > 1 && (
//                                 <Button
//                                   type="button"
//                                   color="danger"
//                                   onPress={() => handleDelete(index)}
//                                   endContent={
//                                     <i className="bi bi-trash-fill text-[1.25rem] text-white"></i>
//                                   }
//                                 >
//                                   Delete
//                                 </Button>
//                               )}
//                             </div>
//                           </div>
//                         );
//                       })}
//                       <div>
//                         <Button
//                           startContent={
//                             <i className="bi bi-plus text-[1.25rem]"></i>
//                           }
//                           color="primary"
//                           onPress={handleAddImage}
//                           isDisabled={!enableAddImage}
//                         >
//                           Add image
//                         </Button>
//                       </div>
//                     </div>
//                     <div className="w-full flex items-center justify-start col-span-2">
//                       <Textarea
//                         label="Description"
//                         labelPlacement="outside"
//                         placeholder="Enter product description"
//                         isRequired={true}
//                         onChange={(e) =>
//                           setProductData((prev) => ({
//                             ...prev,
//                             description: e.target.value,
//                           }))
//                         }
//                         defaultValue={productData.description}
//                       />
//                     </div>
//                     <div className="w-full flex items-center justify-start col-span-2">
//                       Price per Quantity
//                     </div>
//                     <div className="flex flex-col items-start justify-center col-span-2 gap-4">
//                       <div className="w-full flex items-center justify-center col-span-2 gap-4">
//                         <div className="w-full flex items-center justify-start">
//                           <Input
//                             labelPlacement="outside"
//                             placeholder="Quantity"
//                             variant="bordered"
//                             label="Quantity"
//                             type="number"
//                             isRequired={false}
//                           />
//                         </div>
//                         <div className="w-full flex items-center justify-start">
//                           <Input
//                             labelPlacement="outside"
//                             placeholder="Price"
//                             variant="bordered"
//                             label="Price"
//                             type="number"
//                             isRequired={false}
//                           />
//                         </div>
//                       </div>
//                       <div>
//                         <Button
//                           startContent={
//                             <i className="bi bi-plus text-[1.25rem]"></i>
//                           }
//                           color="primary"
//                         >
//                           Add row
//                         </Button>
//                       </div>
//                     </div>
//                   </div>
//                 </ModalBody>
//                 <ModalFooter className="w-full">
//                   <Button color="danger" variant="flat" onPress={onCloseModal}>
//                     Close
//                   </Button>
//                   <Button color="primary" isLoading={isLoading} type="submit">
//                     Add
//                   </Button>
//                 </ModalFooter>
//               </Form>
//             )}
//           </ModalContent>
//         </Modal>
//       </div>
//       <div className="w-[100%] flex justify-end custom-toast-css">
//         <ToastProvider
//           placement="top-right"
//           toastProps={{
//             classNames: { base: "bg-green-100" },
//             color: "success",
//           }}
//         />
//       </div>
//     </>
//   );
// }
