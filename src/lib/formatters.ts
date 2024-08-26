const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
    currency: "DZD",
    style: "currency",
    minimumFractionDigits: 0,
  })
  
  export function formatCurrency(amount: number) {
    return CURRENCY_FORMATTER.format(amount)
  }
  
  const NUMBER_FORMATTER = new Intl.NumberFormat("en-US")
  
  export function formatNumber(number: number) {
    return NUMBER_FORMATTER.format(number)
  }

export function extractFromProductsAndFormat(url:string) {
    // Find the index of the segment "products" in the URL
    const index = url.indexOf("products");

    // Check if "products" was found
    if (index !== -1) {
        // Extract everything from "products" onward
        let result = url.substring(index);
        
        // Replace "%2F" with "/"
        result = result.replace(/%2F/g, '/');
        
        // Remove "?alt=media" if it exists
        result = result.split('?')[0];
        
        return result;
    }

    // If "products" is not found, return an empty string or the original URL based on your preference
    return "";
}