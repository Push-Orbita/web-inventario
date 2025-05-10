import { animateValue } from "@helpers/animateValue.helper";
import { ColorOptions } from "@interfaces/type/color.type";
import { Skeleton } from "primereact/skeleton";
import { useEffect, useRef } from 'react';

interface Props {
    title?: string,
    quantity?: string,
    icon?: string,
    colorIcon?: ColorOptions,
    backgroundIconColor?: ColorOptions,
    textColorTitle?: ColorOptions,
    footerInfo?: string,
    shadow?: 'none' | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8,
    isLoading?: boolean,
    subTitle?: string,
    quantityArticle?: number,
}

const StatsCard = ({
    title = 'Titulo',
    quantity = '0',
    icon = 'pi pi-user',
    colorIcon = 'blue',
    backgroundIconColor = 'blue',
    shadow = 'none',
    isLoading = false,
    subTitle,
    quantityArticle = 0,
    textColorTitle
}: Props) => {
    const quantityRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (quantityRef.current && typeof quantity === 'string') {
            const newQuantity = parseFloat(quantity.replace(/\./g, '').replace(',', '.'));

            // Obtener el valor actual mostrado en la tarjeta
            const currentText = quantityRef.current.innerText;
            const currentQuantity = parseFloat(currentText.replace(/\./g, '').replace(',', '.'));

            // Si no hay un valor anterior válido, inicializar en 0
            const startQuantity = isNaN(currentQuantity) ? 0 : currentQuantity;

            const adjustedDuration = Math.max(500, Math.min(2000, Math.abs(newQuantity - startQuantity) * 20));

            animateValue(quantityRef.current, startQuantity.toFixed(2).replace('.', ','), quantity, adjustedDuration);
        }
    }, [quantity]);

    return (
        <div className="">
            <div className={`card mb-0 shadow-${shadow}`}>
                <div className="flex justify-content-between mb-3">
                    <div>
                        {isLoading ? (
                            <>
                                <Skeleton width="10rem" className="mb-2"></Skeleton>
                                <Skeleton width="5rem" className="mb-2"></Skeleton>
                                <Skeleton width="2rem" className="mb-2"></Skeleton>
                            </>
                        ) : (
                            <>
                                <span className={`block text-500 font-medium mb-1 text-${textColorTitle}-500`}>{title}</span>
                                <span className="text-500 mb-1">{subTitle}</span>
                                <div ref={quantityRef} className="text-900 font-bold text-2xl">{quantity}</div>
                            </>
                        )}
                        <div />
                    </div>
                    <div className={`flex align-items-center justify-content-center border-round bg-${backgroundIconColor}-100`} style={{ width: '2.5rem', height: '2.5rem' }}>
                        {isLoading ? (
                            <Skeleton size="3rem"></Skeleton>
                        ) : (
                            <i className={`${icon} text-${colorIcon}-500 text-xl`} />
                        )}
                    </div>
                </div>
                {isLoading ? (
                    <Skeleton width="5rem" className="mb-2"></Skeleton>
                ) : (
                    <>
                        <span className="text-green-500 font-medium text-lg mr-2">{quantityArticle}</span>
                        <span className="text-500 text-lg">Articulos Agregados</span>
                    </>
                )}
            </div>
        </div>
    );
};

export default StatsCard;
