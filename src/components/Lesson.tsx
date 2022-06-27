import { CheckCircle, Lock } from 'phosphor-react'
import { isPast, format } from 'date-fns'
import ptBr from 'date-fns/locale/pt-BR'
import { Link, useParams } from 'react-router-dom';
import classnames from 'classnames';

interface LessonPropos{
    title:string;
    slug:string;
    availableAt:Date;
    type:'live'|'class';
} 

export function Lesson(props: LessonPropos)
{
    const {slug} = useParams<{slug:string}>()

    const isLessonAvailableAt = isPast(props.availableAt);
    const availableDateFormatted = format(props.availableAt, "EEEE' • 'd' de 'MMMM' • 'k'h'mm'", {locale:ptBr})
    const isActiveLesson = slug === props.slug

    return (
        <Link to={`/event/lesson/${props.slug}`} className="group">
            <span>{availableDateFormatted}</span>

            <div className={classnames('rounded border border-gray-500 p-4 mt-2 group-hover:border-green-500', {
                'bg-green-500': isActiveLesson  
            })}>
                <header className="flex items-center justify-between">
                    {isLessonAvailableAt? (
                        <span className={classnames("text-sm font-medium flex items-center gap-2", {
                            'text-white': isActiveLesson,
                            'text-blue-500': !isActiveLesson
                        })}>
                            <CheckCircle size={20} />
                            Conteúdo liberado
                        </span> 
                    ) : (
                        <span className="text-sm text-orange-500 font-medium flex items-center gap-2">
                            <Lock size={20} />
                            Em breve
                        </span>
                    )}
                    <span className={classnames("text-xs rounded px-2 py-[0.125rem] text-white border font-bold", {
                        'border-white' : isActiveLesson,
                        'border-green-300' : !isActiveLesson
                    })}>
                        {props.type==='live'? 'AO VIVO': 'AULA PRÁTICA'}
                    </span>                    
                </header>
                <strong className={classnames('mt-5 block', {
                    'text-white' : isActiveLesson,
                    'text-gray-200': !isActiveLesson
                })}>
                    {props.title}
                </strong>
            </div>
        </Link>
    )
}