import { Avatar } from "@heroui/avatar";
import { Input } from "@heroui/input";
import { Listbox, ListboxItem } from "@heroui/listbox";
import { Selection } from "@react-types/shared";
import { ChangeEvent, useState } from "react";

export interface Product {
  id: number;
  name: string;
  description: string;
  avatar: string;
}

export const products: Product[] = [
  {
    id: 1,
    name: "Tony Reichert",
    description: "CEO",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/1.png",
  },
  {
    id: 2,
    name: "Zoey Lang",
    description: "Tech Lead",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/1.png",
  },
  {
    id: 3,
    name: "Jane Fisher",
    description: "Test desc",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/female/2.png",
  },
  {
    id: 4,
    name: "William Howard",
    description: "C.M.",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 5,
    name: "Kristen Copper",
    description: "S. Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 6,
    name: "Brian Kim",
    description: "P. Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 7,
    name: "Michael Hunt",
    description: "Designer",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 8,
    name: "Samantha Brooks",
    description: "HR Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 9,
    name: "Frank Harrison",
    description: "F. Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 10,
    name: "Emma Adams",
    description: "Ops Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 11,
    name: "Brandon Stevens",
    description: "Jr. Dev",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 12,
    name: "Megan Richards",
    description: "P. Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 13,
    name: "Oliver Scott",
    description: "S. Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 14,
    name: "Grace Allen",
    description: "M. Specialist",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 15,
    name: "Noah Carter",
    description: "IT Specialist",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 16,
    name: "Ava Perez",
    description: "Manager",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 17,
    name: "Liam Johnson",
    description: "Data Analyst",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 18,
    name: "Sophia Taylor",
    description: "QA Analyst",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 19,
    name: "Lucas Harris",
    description: "Administrator",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
  {
    id: 20,
    name: "Mia Robinson",
    description: "Coordinator",
    avatar: "https://d2u8k2ocievbld.cloudfront.net/memojis/male/2.png",
  },
];

export default function SearchProduct() {
  const [searchResult, setSearchResult] = useState<Product[]>([]);

  const searchProduct = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.value.length) {
      const matcher = new RegExp(`^${e.target.value.toLowerCase()}`, "g");
      const searchedProducts =
        products.filter(
          (product) =>
            RegExp(matcher).exec(product.name.toLowerCase()) ||
            RegExp(matcher).exec(product.description.toLowerCase())
        ) ?? [];
      setSearchResult(searchedProducts);
    } else {
      setSearchResult([]);
    }
  };

  const onProductSelect = (keys: Selection) => {
    console.log("Selected product: ", keys);
  };

  return (
    <div className="w-[80%]">
      <Input
        variant="faded"
        startContent={
          <i className="bi bi-search text-[1.25rem] pr-[.5rem]"></i>
        }
        classNames={{
          inputWrapper: "h-[3rem]",
          input: "text-[1rem] font-semibold",
        }}
        color="primary"
        isClearable
        onClear={() => setSearchResult([])}
        onChange={searchProduct}
      />
      {searchResult.length > 0 && (
        <Listbox
          classNames={{
            base: "max-w-xs bg-default-200 mt-[.25rem] rounded-lg",
            list: "max-h-[300px] overflow-scroll",
          }}
          defaultSelectedKeys={["1"]}
          items={searchResult}
          label="Assigned to"
          selectionMode="none"
          variant="flat"
          onSelectionChange={onProductSelect}
        >
          {(item) => (
            <ListboxItem key={item.id} textValue={item.name}>
              <div className="flex gap-2 items-center">
                <Avatar
                  alt={item.name}
                  className="flex-shrink-0"
                  size="sm"
                  src={item.avatar}
                />
                <div className="flex flex-col">
                  <span className="text-small">{item.name}</span>
                  <span className="text-tiny text-default-400">
                    {item.description}
                  </span>
                </div>
              </div>
            </ListboxItem>
          )}
        </Listbox>
      )}
    </div>
  );
}
