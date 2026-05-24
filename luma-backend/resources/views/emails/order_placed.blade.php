<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8">
    <title>Confirmation de commande - LUMA</title>
</head>
<body style="font-family: Arial, sans-serif; color: #333; line-height: 1.6; max-width: 600px; margin: 0 auto; padding: 20px;">
    
    <div style="text-align: center; margin-bottom: 30px;">
        <h1 style="letter-spacing: 4px; color: #1A1A1A;">LUMA</h1>
        <p style="color: #666; font-size: 14px;">Merci pour votre commande !</p>
    </div>

    <div style="background-color: #FAF9F6; padding: 20px; border-radius: 8px; margin-bottom: 30px;">
        <h2 style="font-size: 18px; border-bottom: 1px solid #EAEAEA; padding-bottom: 10px; margin-bottom: 15px;">Détails de la commande N° {{ str_pad($order->id, 5, '0', STR_PAD_LEFT) }}</h2>
        <p><strong>Montant Total :</strong> {{ $order->total }} MAD</p>
        <p><strong>Mode de paiement :</strong> {{ $order->payment_method === 'cod' ? 'À la livraison' : 'En ligne' }}</p>
    </div>

    <div>
        <h3 style="font-size: 16px;">Adresse de livraison :</h3>
        <p>
            {{ $order->shipping_address['name'] ?? '' }}<br>
            {{ $order->shipping_address['address'] ?? '' }}<br>
            {{ $order->shipping_address['city'] ?? '' }}<br>
            Tel : {{ $order->shipping_address['phone'] ?? '' }}
        </p>
    </div>

    <p style="margin-top: 40px; text-align: center; color: #888; font-size: 12px;">
        Ceci est un email automatique, merci de ne pas y répondre.<br>
        © {{ date('Y') }} LUMA. Tous droits réservés.
    </p>

</body>
</html>
