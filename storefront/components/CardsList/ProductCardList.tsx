import React, { useEffect, useState } from "react";
import Card from "./Cards";
import styled from "styled-components";
import Select from "react-select";
import customSelectTheme from "@/utils/customSelectTheme";
import { Category, Product } from "../../types";
import client from "@/utils/client";

const DropdownContainer = styled.div`
  margin-top: 16px;
  margin-bottom: 16px;
  width: 200px;
`;

const ProductCardList = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);

  const getProducts = async () => {
    const data = await client('/product', 'get', {});

    if (!data?.response?.data) {
      setProducts(data)
    } else {
      console.error(data.message)
    }
  };

  const getCategories = async () => {
    const data = await client('/category', 'get', {});

    if (!data?.response?.data) {
      setCategories(data)
    } else {
      console.error(data.message)
    }    
  }

  const getCategoryOptions = () => {
    const options = categories.map(category => {
      return { value: category.id, label: category.name }
    })

    options.push({ value: '0', label: 'All' });
    console.log(options)
    return options
  }

  const getCategory = async (id: string) => {
    console.log(id)
    const data = await client(`/category/${id}`, 'get', {});

    if (!data?.response?.data) {
      setProducts(data.products)
    } else {
      console.error(data.message)
    }
  }

  useEffect(() => {
    getProducts()
    getCategories()
  }, []);

  return (
    <>
      <DropdownContainer>
        <Select
          options={getCategoryOptions()}
          theme={customSelectTheme}
          placeholder="Select an option"
          onChange={(val) => {
            if (val) {
              if (val.value === "0") {
                getProducts()
              } else {
                getCategory(val.value)
              }
            }
          }}
        />
      </DropdownContainer>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
        }}
      >
        {products?.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
    </>
  );
};

export default ProductCardList;
