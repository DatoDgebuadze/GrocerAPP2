//Validation to the forms
//Two buttons for Edit and Delete with thier handlers

import { useEffect } from "react";
import { useForm } from "react-hook-form"

export default function IventoryForm({
    formData, 
    handleOnChange, 
    handleOnSubmit,
    toggleEdit,
}) {

        const {id} = formData;
        const {
            register, 
            handleSubmit, 
            formState:{errors}, 
            reset
        } = useForm({defaultValues: id 
            ? formData 
            : {
            id: "Default",
            productName: "Default",
            brand: "Default",
            quantity: "Default",
            image: "Default",
            price: "Default"
        }})
        useEffect(() => reset(formData), [toggleEdit])
    return(
    <div>
        <form action="" onSubmit={handleSubmit(handleOnSubmit)}>
            <div>
                <label htmlFor="productName">Product Name</label>
                <input 
                type="text" 
                {...register("productName", {required: "Please enter a valid product name"})}
                name="productName" 
                id="productName" 
                onChange={handleOnChange}
                value={formData.productName}
                />
                <span>{errors.productName?.message}</span>
            </div>
            <div>
                <label htmlFor="brand">Brand</label>
                <input 
                type="text" 
                {...register("brand", {required: "Please enter a valid brand"})}
                id="brand" 
                onChange={handleOnChange}
                value={formData.brand}
                />
                <span>{errors.brand?.message}</span>
            </div>
            <div>
                <label htmlFor="quantity">Quantity</label>
                <input 
                type="text" 
                {...register("quantity", {required: "Please enter a valid quantity"})} 
                id="quantity" 
                onChange={handleOnChange}
                value={formData.quantity}
                />
                <span>{errors.quantity?.message}</span>
            </div>
            <div>
                <label htmlFor="image">Image URL</label>
                <input 
                type="text" 
                {...register("image", {required: "Please enter a valid image URL"})} 
                id="image" 
                onChange={handleOnChange}
                value={formData.image}
                />
                <span>{errors.image?.message}</span>
            </div>
            <div>
                <label htmlFor="price">Price</label>
                <input 
                type="text" 
                {...register("price", {required: "Please enter a valid price"})} 
                id="price" 
                onChange={handleOnChange}
                value={formData.price}
                />
                <span>{errors.price?.message}</span>
            </div>
            <button>{toggleEdit ? `Edit ${formData.productName}` : "Add to Iventory"}</button>
        </form>
    </div>
    )
}