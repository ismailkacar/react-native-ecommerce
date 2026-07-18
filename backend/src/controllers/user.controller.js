export const addAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const user = req.user;
    if (isDefault) {
      user.addresses.forEach((addr) => (addr.isDefault = false));
    }
    user.addresses.push({
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault: isDefault || false,
    });
    await user.save();
    res.status(201).json({
      message: "Address added succesfully",
      addresses: user.addresses,
    });
  } catch (error) {
    console.log("Error in addAddress controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
export const getAddresses = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ addresses: user.addresses });
  } catch (error) {
    console.log("Error in getAddress controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
export const updateAddress = async (req, res) => {
  try {
    const {
      label,
      fullName,
      streetAddress,
      city,
      state,
      zipCode,
      phoneNumber,
      isDefault,
    } = req.body;

    const { addressId } = req.params;
    const { user } = req.user;
    const { address } = user.addresses.id(addressId);

    if (!address) {
      return res.status(404).json({ error: "Address not found" });
    }

    if (isDefault) {
      user.addresses.forEach((addr) => {
        addr.isDefault = false;
      });
    }

    address.label = label || address.label;
    address.fullName = fullName || address.fullName;
    address.streetAddress = streetAddress || address.streetAddress;
    address.city = city || address.city;
    address.state = state || address.state;
    address.zipCode = zipCode || address.zipCode;
    address.phoneNumber = phoneNumber || address.phoneNumber;
    address.isDefault = isDefault !== undefined ? isDefault : address.isDefault;

    await user.save();

    res.status(200).json({
      message: "Address updated successfully",
      adresses: user.addresses,
    });
  } catch (error) {
    console.log("Error in updateAddress controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
export const deleteAddress = async (req, res) => {
  try {
    const { addressId } = req.params;
    const user = req.user;
    user.adresses.pull(addressId);
    await user.save();
  } catch (error) {
    console.log("Error in deleteAddress controller");
    res.status(500).json({ error: "Internal server error." });
  }
};

export const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.params;
    const user = req.user;

    //check if product is already in the wishlist
    if (user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "Product is already on your wishlist!" });
    }
    user.wishlist.push(productId);
    await user.save();
    res
      .status(200)
      .json({ message: "Product added to wishlist.", wishlist: user.wishlist });
  } catch (error) {
    console.log("Error in addToWishlist controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
export const removeFromWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const user = req.user;

    if (!user.wishlist.includes(productId)) {
      return res
        .status(400)
        .json({ message: "This product is not already on your wishlist. " });
    }

    user.wishlist.pull(productId);
    await user.save();
    res.status(200).json({
      message: "Product removed from wishlist.",
      wishlist: user.wishlist,
    });
  } catch (error) {
    console.log("Error in removeFromWishlist controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
export const getWishlist = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({ wishlist: user.wishlist });
  } catch (error) {
    console.log("Error in getWishlist controller");
    res.status(500).json({ error: "Internal server error." });
  }
};
