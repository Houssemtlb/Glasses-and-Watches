import { formatCurrency } from "@/lib/formatters";
import { getSpecificOrderInfos } from "../../_actions/orders";
import { DeleteOrderButton, ToggleValidateOrderButton } from "./SpecificOrderButtons";

export async function SpecificOrderComponent({id} : {id:string}) {

    const orderDetails = await getSpecificOrderInfos(id);
  
    if (!orderDetails) {
      return <div>La commande n'existe pas</div>;
    }
  
    const { order, product, user } = orderDetails;
  
    return (
      <div className="container mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold mb-4">Informations Utilisateur</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
                    Prénom
                  </label>
                  <input
                    disabled={true}
                    id="firstName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={user.firstName}
                  />
                </div>
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
                    Nom
                  </label>
                  <input
                    disabled={true}
                    id="lastName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={user.lastName}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                  Email
                </label>
                <input
                  disabled={true}
                  id="email"
                  type="email"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  defaultValue={user.email}
                />
              </div>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
                  Numéro de Téléphone
                </label>
                <input
                  disabled={true}
                  id="phone"
                  type="tel"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  defaultValue={user.phone}
                />
              </div>
              <div>
                <label htmlFor="wilaya" className="block text-sm font-medium text-gray-700">
                  Wilaya (région)
                </label>
                <input
                  disabled={true}
                  id="wilaya"
                  type="text"
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  defaultValue={user.wilaaya}
                />
              </div>
              <div>
                <label htmlFor="address" className="block text-sm font-medium text-gray-700">
                  Adresse
                </label>
                <textarea
                  disabled={true}
                  id="address"
                  rows={3}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                  defaultValue={user.address}
                />
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-2xl font-bold mb-4">Détails de la Commande</h2>
            <div className="grid grid-cols-1 gap-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="productName" className="block text-sm font-medium text-gray-700">
                    Nom du Produit
                  </label>
                  <input
                    disabled={true}
                    id="productName"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={product.name}
                  />
                </div>
                <div>
                  <label htmlFor="quantity" className="block text-sm font-medium text-gray-700">
                    Quantité
                  </label>
                  <input
                    disabled={true}
                    id="quantity"
                    type="number"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={order.quantity}
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="totalPrice" className="block text-sm font-medium text-gray-700">
                    Prix Total
                  </label>
                  <input  
                    disabled={true}
                    id="totalPrice"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={`${formatCurrency(order.totalPrice)}`}
                  />
                </div>
                <div>
                  <label htmlFor="orderDate" className="block text-sm font-medium text-gray-700">
                    Date de la Commande
                  </label>
                  <input
                    disabled={true}
                    id="orderDate"
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-primary focus:ring-primary sm:text-sm"
                    defaultValue={order.createdAt.toISOString().split('T')[0]}
                  />
                </div>
              </div>
            </div>
            <div className="mt-6 flex justify-end gap-4">
              <DeleteOrderButton id={id}/>
              <ToggleValidateOrderButton id={id} isValid={order.isValidated}/>
            </div>
          </div>
        </div>
      </div>
    );
}