import React from 'react';
import { useForm } from 'react-hook-form';

export default function InventoryForm({ formData, handleOnChange, handleOnSubmit }) {
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = (data) => {
        // Handle form submission here
        console.log(data);
        handleOnSubmit(data); 
    };

    return (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="productName">Product Name </label>
                    <input
                        type="text"
                        name="productName"
                        id="productName"
                        onChange={handleOnChange}
                        value={formData.productName}
                        {...register('productName', { required: 'Product Name is required' })}
                    />
                    {errors.productName && <p>{errors.productName.message}</p>}
                </div>

                <div>
                    <label htmlFor="brand">Brand </label>
                    <input
                        type="text"
                        name="brand"
                        id="brand"
                        onChange={handleOnChange}
                        defaultValue={formData.brand}
                        {...register('brand', { required: 'Brand is required' })}
                    />
                    {errors.brand && <p>{errors.brand.message}</p>}
                </div>

                <div>
                    <label htmlFor="quantity">Quantity </label>
                    <input
                        type="text"
                        name="quantity"
                        id="quantity"
                        onChange={handleOnChange}
                        defaultValue={formData.quantity}
                        {...register('quantity', { required: 'Quantity is required' })}
                    />
                    {errors.quantity && <p>{errors.quantity.message}</p>}
                </div>

                <div>
                    <label htmlFor="image">Image URL</label>
                    <input
                        type="text"
                        name="image"
                        id="image"
                        onChange={handleOnChange}
                        defaultValue={formData.image}
                        {...register('image')}
                    />
                </div>

                <div>
                    <label htmlFor="price">Price </label>
                    <input
                        type="text"
                        name="price"
                        id="price"
                        onChange={handleOnChange}
                        defaultValue={formData.price}
                        {...register('price', {
                            pattern: {
                                value: /^\d+(\.\d{1,2})?$/,
                                message: 'Please enter a valid price with up to two decimal places',
                            },
                        })}
                    />
                    {errors.price && <p>{errors.price.message}</p>}
                </div>

                <button type="submit">Add to Inventory</button>
            </form>
        </div>
    );
}
