
const schemaData = {
      "@context": "https://schema.org",
      "@graph": [
        {
          "@type": ["Restaurant", "LocalBusiness"],
          "@id": "https://www.cleanfoodsp.com.br/#organization",
          "name": "CleanFoods SP",
          "alternateName": "CleanFoods Marmitaria Fitness",
          "description": "Marmitaria fitness no Ipiranga, São Paulo. Marmitas saudáveis de frango, patinho e gourmet com entrega na região.",
          "url": "https://www.cleanfoodsp.com.br/",
          "logo": "https://www.cleanfoodsp.com.br/logo-moema.png",
          "image": "https://www.cleanfoodsp.com.br/hero-image.png",
          "telephone": "+5511910993953",
          "priceRange": "R$19–R$35",
          "servesCuisine": ["Comida Fitness", "Marmita Saudável", "Comida Fit"],
          "address": {
            "@type": "PostalAddress",
            "streetAddress": "Ipiranga",
            "addressLocality": "São Paulo",
            "addressRegion": "SP",
            "postalCode": "04200-000",
            "addressCountry": "BR"
          },
          "geo": {
            "@type": "GeoCoordinates",
            "latitude": -23.5875,
            "longitude": -46.6086
          },
          "openingHoursSpecification": [
            {
              "@type": "OpeningHoursSpecification",
              "dayOfWeek": ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
              "opens": "11:00",
              "closes": "19:00"
            }
          ],
          "areaServed": {
            "@type": "City",
            "name": "São Paulo"
          },
          "sameAs": [
            "https://wa.me/5511910993953"
          ],
          "hasMenu": "https://www.cleanfoodsp.com.br/cardapio-completo.html"
        },
        {
          "@type": "Menu",
          "@id": "https://www.cleanfoodsp.com.br/#menu",
          "name": "Cardápio CleanFoods",
          "description": "Marmitas fitness com frango, patinho bovino e opções gourmet, nos tamanhos P e G.",
          "url": "https://www.cleanfoodsp.com.br/cardapio-completo.html",
          "hasMenuSection": [
            {
              "@type": "MenuSection",
              "name": "Linha Frango",
              "description": "Marmitas fitness com frango desfiado ou grelhado, acompanhadas de carboidratos naturais e legumes.",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Frango Desfiado com Purê de Batata Doce e Legumes",
                  "description": "Marmita fitness de frango desfiado com purê de batata doce e legumes frescos",
                  "offers": {
                    "@type": "Offer",
                    "price": "19.50",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                  }
                },
                {
                  "@type": "MenuItem",
                  "name": "Frango Desfiado com Arroz Integral e Legumes",
                  "description": "Marmita fitness de frango desfiado com arroz integral e mix de legumes",
                  "offers": {
                    "@type": "Offer",
                    "price": "19.50",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Linha Patinho",
              "description": "Marmitas fitness com patinho bovino magro, rico em proteínas.",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Patinho Bovino com Arroz Integral e Legumes",
                  "description": "Marmita fitness de patinho bovino magro com arroz integral e legumes",
                  "offers": {
                    "@type": "Offer",
                    "price": "22.50",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            },
            {
              "@type": "MenuSection",
              "name": "Linha Gourmet",
              "description": "Opções premium de marmita fitness com ingredientes selecionados.",
              "hasMenuItem": [
                {
                  "@type": "MenuItem",
                  "name": "Marmita Gourmet",
                  "description": "Marmita fitness gourmet com ingredientes premium selecionados",
                  "offers": {
                    "@type": "Offer",
                    "price": "27.50",
                    "priceCurrency": "BRL",
                    "availability": "https://schema.org/InStock"
                  }
                }
              ]
            }
          ]
        },
        {
          "@type": "FAQPage",
          "@id": "https://www.cleanfoodsp.com.br/#faq",
          "mainEntity": [
            {
              "@type": "Question",
              "name": "A CleanFoods faz entrega em São Paulo?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! A CleanFoods entrega marmitas fitness em São Paulo e região do Ipiranga. Entre em contato pelo WhatsApp (11) 91099-3953 para confirmar sua área de entrega."
              }
            },
            {
              "@type": "Question",
              "name": "Qual o horário de funcionamento da CleanFoods?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "A CleanFoods funciona de domingo a domingo, das 11h às 19h. Faça seu pedido pelo site ou WhatsApp."
              }
            },
            {
              "@type": "Question",
              "name": "As marmitas da CleanFoods são sem glúten e sem lactose?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "Sim! Todas as marmitas da CleanFoods são preparadas sem glúten e sem lactose, ideais para quem treina e busca uma alimentação limpa."
              }
            },
            {
              "@type": "Question",
              "name": "Quais são os tamanhos de marmita disponíveis?",
              "acceptedAnswer": {
                "@type": "Answer",
                "text": "As marmitas da CleanFoods estão disponíveis nos tamanhos P (Pequeno) e G (Grande), com preços a partir de R$19,50."
              }
            }
          ]
        }
      ]
    }
    