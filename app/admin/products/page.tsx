"use client";

import { Product } from "@/app/api/products/route";
import { Autocomplete, AutocompleteItem } from "@heroui/autocomplete";
import { Button, PressEvent } from "@heroui/button";
import { Form } from "@heroui/form";
import { Input, Textarea } from "@heroui/input";
import { Image } from "@heroui/image";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  useDisclosure,
} from "@heroui/modal";
import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import { addToast, ToastProvider } from "@heroui/toast";
import axios from "axios";
import { FormEvent, Key, useEffect, useState } from "react";
import "./style.css";

const columns = [
  {
    key: "thumbnail_image",
    label: "IMAGE",
  },
  {
    key: "product_name",
    label: "NAME",
  },
  {
    key: "base_price",
    label: "PRICE",
  },
  {
    key: "brand",
    label: "BRAND",
  },
  {
    key: "category",
    label: "CATEGORY",
  },
  {
    key: "description",
    label: "DESCRIPTION",
  },
  {
    key: "stock_quantity",
    label: "STOCK",
  },
];

const animals = [
  {
    label: "Cat",
    key: "cat",
    description: "The second most popular pet in the world",
  },
  {
    label: "Dog",
    key: "dog",
    description: "The most popular pet in the world",
  },
  {
    label: "Elephant",
    key: "elephant",
    description: "The largest land animal",
  },
  { label: "Lion", key: "lion", description: "The king of the jungle" },
  { label: "Tiger", key: "tiger", description: "The largest cat species" },
  { label: "Giraffe", key: "giraffe", description: "The tallest land animal" },
  {
    label: "Dolphin",
    key: "dolphin",
    description: "A widely distributed and diverse group of aquatic mammals",
  },
  {
    label: "Penguin",
    key: "penguin",
    description: "A group of aquatic flightless birds",
  },
  {
    label: "Zebra",
    key: "zebra",
    description: "A several species of African equids",
  },
  {
    label: "Shark",
    key: "shark",
    description:
      "A group of elasmobranch fish characterized by a cartilaginous skeleton",
  },
  {
    label: "Whale",
    key: "whale",
    description: "Diverse group of fully aquatic placental marine mammals",
  },
  {
    label: "Otter",
    key: "otter",
    description: "A carnivorous mammal in the subfamily Lutrinae",
  },
  {
    label: "Crocodile",
    key: "crocodile",
    description: "A large semiaquatic reptile",
  },
];

interface ImageInterface {
  imageUrl: string;
  isThumbnail: boolean;
}

interface ProductPayload {
  productName: string;
  description: string;
  basePrice: string; // or number if you want to parse it
  stockQuantity: number | null;
  category: string;
  brand: string;
  sku: string;
  thumbnail: ImageFile | null;
  images: ImageInterface[] | null;
  pricePerQuantity: { [index: string]: number }; // or a more specific type if you know the JSON structure
}

export interface ImageFile {
  base64String: string;
  fileName: string;
  file: File | null;
  isThumbnail: boolean;
}

export interface ProductImagesPayload {
  productId?: number;
  imageUrl: string;
  isThumbnail?: boolean;
}

export interface ImageUploadResponse {
  filePathList: ImageInterface[];
}

export default function ProductPage() {
  const [productList, setProductList] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [enableAddImage, setEnableAddImage] = useState<boolean>(false);
  const [productData, setProductData] = useState<ProductPayload>({
    productName: "",
    category: "",
    sku: "",
    brand: "",
    basePrice: "",
    stockQuantity: null,
    thumbnail: null,
    images: null,
    description: "",
    pricePerQuantity: {},
  });
  const [selectedImageFiles, setSelectedImageFiles] = useState<ImageFile[]>([
    {
      base64String: "",
      file: null,
      fileName: "",
      isThumbnail: false,
    },
  ]);
  const [thumbnailImageFile, setThumbnailImageFile] =
    useState<ImageFile | null>();
  const [productImages, setProductImages] = useState<ProductImagesPayload[]>(
    []
  );
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const fetchProducts = async (): Promise<Product[]> => {
    const response = await axios.get("/api/products");
    return response.data;
  };

  useEffect(() => {
    fetchProducts().then((response) => {
      const products = response.map((product) => {
        return {
          ...product,
          thumbnail_image: product.images?.filter(
            (image) => image.isThumbnail
          )?.[0]?.imageUrl,
        };
      });
      setProductList(products);
    });
  }, []);

  //   useEffect(() => {
  //     const images = selectedImageFiles.map<ProductImagesPayload>(imageFile => {
  //         return {
  //             imageUrl: imageFile.
  //         }
  //     })
  //   }, [selectedImageFiles]);

  const getKeyValue = (item: Product, key: Key) => {
    let value = "";
    Object.entries(item).forEach((i) => {
      if (i[0] === key) value = i[1];
    });
    return value;
  };

  const onOpenAddProduct = (e: PressEvent) => {
    setIsLoading(true);
    setTimeout(() => {
      onOpen();
      setIsLoading(false);
    }, 500);
  };

  const onAddProduct = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const productResult = await axios.post("/api/products", productData);

      console.log("Response Data: ", productResult.data);
      const productId = productResult.data.productId;

      const allImages = [...selectedImageFiles, thumbnailImageFile];

      console.log("allImages", allImages);

      const arrayBuffers: ArrayBuffer[] = [];
      const contentTypes: string[] = [];
      const isThumbnailList: boolean[] = [];

      await Promise.all(
        allImages.map(async (file) => {
          const buffer = await file?.file?.arrayBuffer();
          arrayBuffers.push(buffer ?? ({} as ArrayBuffer));
          contentTypes.push(file?.file?.type ?? "");
          isThumbnailList.push(file?.isThumbnail ?? false);
        })
      );

      const payload = JSON.stringify({
        buffers: arrayBuffers.map((buffer) =>
          Array.from(new Uint8Array(buffer))
        ),
        types: contentTypes,
        thumbnailList: isThumbnailList,
      });

      console.log("Payload: ", payload);

      axios
        .post<ImageUploadResponse>("/api/images/upload", payload, {
          headers: {
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          console.log("Response: ", response.data);
          //   const images = productImages;
          //   images.push({
          //     productId: productId,
          //     imageUrl: response.data.filename,
          //   });
          //   setProductImages(images);
          const imageFileList: ProductImagesPayload[] = [];
          response.data.filePathList.forEach((image) => {
            imageFileList.push({
              productId,
              imageUrl: image.imageUrl,
              isThumbnail: image.isThumbnail,
            });
            // setProductImages((prev) => [
            //   ...prev,
            //   {
            //     productId,
            //     imageUrl: image.imageUrl,
            //     isThumbnail: image.isThumbnail,
            //   },
            // ]);
          });

          setProductImages(imageFileList);

          axios
            .post("/api/images", imageFileList)
            .then((response) => {
              if (response.data) {
                console.log("Image url inserted to DB.");
              }
            })
            .catch((error) => {
              console.log("Error: ", error);
            })
            .finally(() => {
              addToast({
                title: "Saved",
                description: "Product saved successfully",
              });
              fetchProducts().then((response) => {
                const products = response.map((product) => {
                  return {
                    ...product,
                    thumbnail_image: product.images?.filter(
                      (image) => image.isThumbnail
                    )?.[0]?.imageUrl,
                  };
                });
                setProductList(products);
              });
            });
        })
        .catch((error) => {
          setIsLoading(false);
          console.error("Error uploading image:", error);
          addToast({
            title: "Error",
            description: "Error uploading image",
          });
        })
        .finally(() => {
          console.log("Imagesssss: ", productImages);

          //   axios
          //     .post("/api/images", productImages)
          //     .then((response) => {
          //       if (response.data) {
          //         console.log("Image url inserted to DB.");
          //       }
          //     })
          //     .catch((error) => {
          //       console.log("Error: ", error);
          //     })
          //     .finally(() => {
          //       addToast({
          //         title: "Saved",
          //         description: "Product saved successfully",
          //       });
          //     });
        });

      //   axios
      //     .post("/api/images/upload", arrayBuffer, {
      //       headers: {
      //         "Content-Type": "application/json",
      //       },
      //     })
      //     .then((response) => {
      //       console.log("Response: ", response.data);
      //       const images = productImages;
      //       images.push({
      //         productId: productId,
      //         imageUrl: response.data.filename,
      //       });
      //       setProductImages(images);
      //     })
      //     .catch((error) => {
      //       setIsLoading(false);
      //       console.error("Error uploading image:", error);
      //       addToast({
      //         title: "Error",
      //         description: "Error uploading image",
      //       });
      //     })
      //     .finally(() => {
      //       console.log("Imagesssss: ", productImages);

      //       axios
      //         .post("/api/images", productImages)
      //         .then((response) => {
      //           if (response.data) {
      //             console.log("Image url inserted to DB.");
      //           }
      //         })
      //         .catch((error) => {
      //           console.log("Error: ", error);
      //         })
      //         .finally(() => {
      //           addToast({
      //             title: "Saved",
      //             description: "Product saved successfully",
      //           });
      //         });
      //     });

      // selectedImageFiles.forEach(async (file) => {
      //   const arrayBuffer = await file.file?.arrayBuffer();
      //   const contentType = file.file?.type;

      //   axios
      //     .post("/api/images/upload", arrayBuffer, {
      //       headers: {
      //         "Content-Type": contentType ?? "",
      //       },
      //     })
      //     .then((response) => {
      //       console.log("Response: ", response.data);
      //       const images = productImages;
      //       images.push({
      //         productId: productId,
      //         imageUrl: response.data.filename,
      //       });
      //       setProductImages(images);
      //     })
      //     .catch((error) => {
      //       setIsLoading(false);
      //       console.error("Error uploading image:", error);
      //       addToast({
      //         title: "Error",
      //         description: "Error uploading image",
      //       });
      //     })
      //     .finally(() => {
      //       console.log("Imagesssss: ", productImages);

      //       axios
      //         .post("/api/images", productImages)
      //         .then((response) => {
      //           if (response.data) {
      //             console.log("Image url inserted to DB.");
      //           }
      //         })
      //         .catch((error) => {
      //           console.log("Error: ", error);
      //         })
      //         .finally(() => {
      //           addToast({
      //             title: "Saved",
      //             description: "Product saved successfully",
      //           });
      //         });
      //     });
      // });
    } catch (error) {
      addToast({
        title: "Error",
        description: "Error uploading image",
      });
      console.error("Error uploading image:", error);
    } finally {
      console.log("Images: ", productImages);
      setIsLoading(false);
      onClose();
      fetchProducts().then((response) => {
        const products = response.map((product) => {
          return {
            ...product,
            thumbnail_image: product.images?.filter(
              (image) => image.isThumbnail
            )?.[0]?.imageUrl,
          };
        });
        setProductList(products);
      });
    }
  };

  const handleFileChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedImageFiles(
        selectedImageFiles.map((file, i) => {
          if (i === index) {
            return {
              ...file,
              file: event.target.files?.[0] ?? null,
              base64String: URL.createObjectURL(
                event.target.files?.[0] ?? ({} as Blob)
              ),
              fileName: event.target.files?.[0].name ?? "",
              isThumbnail: false,
            };
          } else {
            return { ...file };
          }
        })
      );
    }
  };

  const handleThumbnailFileChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (event.target.files && event.target.files.length > 0) {
      const thumbnailImageFile = event.target.files[0];
      const thumbnailImageFileName = event.target.files[0].name;
      const thumbnailImageUrl = URL.createObjectURL(event.target.files[0]);
      setThumbnailImageFile({
        base64String: thumbnailImageUrl,
        file: thumbnailImageFile,
        fileName: thumbnailImageFileName,
        isThumbnail: true,
      });
      // setProductData((prev) => ({
      //   ...prev,
      //   thumbnail: {
      //     base64String: thumbnailImageUrl,
      //     file: thumbnailImageFile,
      //     fileName: thumbnailImageFileName,
      //   },
      // }));
    }
  };

  useEffect(() => {
    if (selectedImageFiles.length) {
      const imageUrls: ImageInterface[] = [];
      selectedImageFiles.forEach((file, index) => {
        if (file.fileName) {
          const fileInput = document.getElementById(
            `imageUpload${index.toString()}`
          ) as HTMLInputElement;

          // Now let's create a DataTransfer to get a FileList
          const dataTransfer = new DataTransfer();
          dataTransfer.items.add(file.file ?? ({} as File));
          if (fileInput) {
            fileInput.files = dataTransfer.files;
          }
          imageUrls.push({ imageUrl: file.base64String, isThumbnail: false });
        }
      });

      setProductData((prev) => ({ ...prev, images: imageUrls }));
    }
    if (selectedImageFiles[selectedImageFiles.length - 1].fileName) {
      setEnableAddImage(true);
    } else {
      setEnableAddImage(false);
    }
  }, [selectedImageFiles]);

  const handleAddImage = () => {
    if (selectedImageFiles[selectedImageFiles.length - 1].fileName) {
      setSelectedImageFiles((prev) => [
        ...prev,
        {
          base64String: "",
          file: null,
          fileName: "",
          isThumbnail: false,
        },
      ]);
    }
  };

  const handleDelete = async (index: number) => {
    setSelectedImageFiles(selectedImageFiles.filter((file, i) => i !== index));
    const fileInput = document.getElementById(
      `imageUpload${index.toString()}`
    ) as HTMLInputElement;
    fileInput.value = "";
    fileInput.files = null;
  };

  return (
    <div className="flex flex-col justify-start items-center h-screen px-6">
      <div>Product Catalog!</div>
      <div className="w-full flex items-center justify-end py-[1rem]">
        <Button
          variant="shadow"
          color="primary"
          onPress={onOpenAddProduct}
          isLoading={isLoading}
        >
          Add Product
        </Button>
      </div>
      <div>
        <Modal
          isOpen={isOpen}
          placement="center"
          onOpenChange={onOpenChange}
          size="3xl"
          scrollBehavior="inside"
        >
          <ModalContent>
            {(onClose) => (
              <Form className="w-full overflow-auto" onSubmit={onAddProduct}>
                <ModalHeader className="flex flex-col gap-1 font-semibold">
                  Add Product
                </ModalHeader>
                <ModalBody className="w-full">
                  <div className="w-full grid grid-cols-2 gap-4">
                    <div className="w-full flex items-center justify-start">
                      <Input
                        labelPlacement="outside"
                        placeholder="Name"
                        variant="bordered"
                        label="Name"
                        isRequired={true}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            productName: e.target.value,
                          }))
                        }
                        defaultValue={productData.productName}
                      />
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <Autocomplete
                        label="Category"
                        placeholder="Category"
                        labelPlacement="outside"
                        isClearable={false}
                        fullWidth
                        onSelectionChange={(value) =>
                          setProductData((prev) => ({
                            ...prev,
                            category: value ? value.toString() : "",
                          }))
                        }
                        isRequired={true}
                        defaultInputValue={productData.category}
                      >
                        {animals.map((animal) => (
                          <AutocompleteItem key={animal.key}>
                            {animal.label}
                          </AutocompleteItem>
                        ))}
                      </Autocomplete>
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <Input
                        labelPlacement="outside"
                        placeholder="SKU"
                        variant="bordered"
                        label="SKU"
                        isRequired={true}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            sku: e.target.value,
                          }))
                        }
                        defaultValue={productData.sku}
                      />
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <Input
                        labelPlacement="outside"
                        placeholder="Brand"
                        variant="bordered"
                        label="Brand"
                        isRequired={false}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            brand: e.target.value,
                          }))
                        }
                        defaultValue={productData.brand}
                      />
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <Input
                        labelPlacement="outside"
                        placeholder="Base Price"
                        variant="bordered"
                        label="Base Price"
                        type="number"
                        isRequired={true}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            basePrice: e.target.value,
                          }))
                        }
                        defaultValue={productData.basePrice}
                      />
                    </div>
                    <div className="w-full flex items-center justify-start">
                      <Input
                        labelPlacement="outside"
                        placeholder="Stock Quantity"
                        variant="bordered"
                        label="Stock Quantity"
                        type="number"
                        isRequired={true}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            stockQuantity: parseInt(e.target.value),
                          }))
                        }
                        defaultValue={productData.stockQuantity?.toString()}
                      />
                    </div>
                    <div className="w-full flex flex-col items-start justify-center gap-2 col-span-2">
                      <label htmlFor="imageUploadThumbnail">
                        Thumbnail <span className="text-[red]">*</span>
                      </label>
                      <div className="w-full grid grid-cols-2 gap-4">
                        <div className="w-full flex items-center justify-start gap-2 col-span-2">
                          <Input
                            type="file"
                            accept="image/*"
                            id={"imageUploadThumbnail"}
                            onChange={(e) => handleThumbnailFileChange(e)}
                            onClick={() => setThumbnailImageFile(null)}
                            color="primary"
                            isRequired={true}
                            labelPlacement="outside"
                            classNames={{
                              inputWrapper: "h-[12rem] cursor-pointer",
                              input: "cursor-pointer",
                            }}
                            className="custom-upload-image"
                            fullWidth
                            endContent={
                              thumbnailImageFile?.base64String && (
                                <Image
                                  src={thumbnailImageFile.base64String}
                                  alt={`Uploaded Image`}
                                  style={{ maxWidth: "200px" }}
                                  height={"10rem"}
                                />
                              )
                            }
                          />
                        </div>
                      </div>
                    </div>
                    <div className="w-full flex flex-col items-start justify-center gap-2 col-span-2">
                      <div>Images</div>
                      {selectedImageFiles?.map((file, index) => {
                        return (
                          <div
                            className="w-full grid grid-cols-2 gap-4"
                            key={file.fileName}
                          >
                            <div className="w-full flex items-center justify-start gap-2">
                              <Input
                                type="file"
                                accept="image/*"
                                id={`imageUpload${index.toString()}`}
                                onChange={(e) => handleFileChange(e, index)}
                                color="primary"
                                isRequired={false}
                                classNames={{
                                  inputWrapper: "h-[3rem] cursor-pointer",
                                  input: "cursor-pointer",
                                }}
                                fullWidth
                              />
                            </div>
                            <div className="w-full grid grid-cols-2 gap-4 items-center justify-center">
                              <div>
                                {file.base64String && (
                                  <Image
                                    src={file.base64String}
                                    alt={`Uploaded Image`}
                                    style={{ maxWidth: "200px" }}
                                    height={"3rem"}
                                  />
                                )}
                              </div>
                              {selectedImageFiles.length > 1 && (
                                <Button
                                  type="button"
                                  color="danger"
                                  onPress={() => handleDelete(index)}
                                  endContent={
                                    <i className="bi bi-trash-fill text-[1.25rem] text-white"></i>
                                  }
                                >
                                  Delete
                                </Button>
                              )}
                            </div>
                          </div>
                        );
                      })}
                      <div>
                        <Button
                          startContent={
                            <i className="bi bi-plus text-[1.25rem]"></i>
                          }
                          color="primary"
                          onPress={handleAddImage}
                          isDisabled={!enableAddImage}
                        >
                          Add image
                        </Button>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-start col-span-2">
                      <Textarea
                        label="Description"
                        labelPlacement="outside"
                        placeholder="Enter product description"
                        isRequired={true}
                        onChange={(e) =>
                          setProductData((prev) => ({
                            ...prev,
                            description: e.target.value,
                          }))
                        }
                        defaultValue={productData.description}
                      />
                    </div>
                    <div className="w-full flex items-center justify-start col-span-2">
                      Price per Quantity
                    </div>
                    <div className="flex flex-col items-start justify-center col-span-2 gap-4">
                      <div className="w-full flex items-center justify-center col-span-2 gap-4">
                        <div className="w-full flex items-center justify-start">
                          <Input
                            labelPlacement="outside"
                            placeholder="Quantity"
                            variant="bordered"
                            label="Quantity"
                            type="number"
                            isRequired={false}
                          />
                        </div>
                        <div className="w-full flex items-center justify-start">
                          <Input
                            labelPlacement="outside"
                            placeholder="Price"
                            variant="bordered"
                            label="Price"
                            type="number"
                            isRequired={false}
                          />
                        </div>
                      </div>
                      <div>
                        <Button
                          startContent={
                            <i className="bi bi-plus text-[1.25rem]"></i>
                          }
                          color="primary"
                        >
                          Add row
                        </Button>
                      </div>
                    </div>
                  </div>
                </ModalBody>
                <ModalFooter className="w-full">
                  <Button color="danger" variant="flat" onPress={onClose}>
                    Close
                  </Button>
                  <Button color="primary" isLoading={isLoading} type="submit">
                    Add
                  </Button>
                </ModalFooter>
              </Form>
            )}
          </ModalContent>
        </Modal>
      </div>
      <div className="w-[100%] flex justify-end custom-toast-css">
        <ToastProvider
          placement="top-right"
          toastProps={{
            classNames: { base: "bg-green-100" },
            color: "success",
          }}
        />
      </div>
      <Table aria-label="Example table with dynamic content">
        <TableHeader columns={columns}>
          {(column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          )}
        </TableHeader>
        <TableBody items={productList}>
          {(item) => (
            <TableRow key={item.sku}>
              {(columnKey) => {
                if (columnKey === "thumbnail_image") {
                  return (
                    <TableCell>
                      {getKeyValue(item, columnKey) && (
                        <Image
                          alt="HeroUI hero Image"
                          src={getKeyValue(item, columnKey)}
                          className="w-[4rem] h-[3rem]"
                        />
                      )}
                    </TableCell>
                  );
                } else {
                  return <TableCell>{getKeyValue(item, columnKey)}</TableCell>;
                }
              }}
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
