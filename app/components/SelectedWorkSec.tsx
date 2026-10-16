"use client"

import { Boxes, MoveUpRight } from 'lucide-react'
import React, { useEffect, useState } from 'react'
import SectionHeader from './SectionHeader'
import { Reveal } from './Reveal'
import SkillTag from './SkillTag'
import { supabase } from '@/lib/supabase/client'
import { PreviewProject, Project } from '@/lib/types'
import ProjectCard from './ProjectCard'

function SelectedWorkSec() {



  const [projects, setProjects] = useState<PreviewProject[]>([])

  const fetchProjects = async () => {
    const { data, error } = await supabase.from("projects").select("id , title , tech_tags , short_description , icon").eq("status","published")

    if(error){
      console.log(error)
      alert("err")
      return;
    }
    if(data){
      setProjects(data as PreviewProject[])
    }
  }

  useEffect(() => {
    fetchProjects()
  },[])



  return (
    <>
      <Reveal id='selectedWork'><SectionHeader order='01.' title='SELECTED WORKS' /></Reveal>
      <div id='selectedWork' className="flex gap-10 flex-wrap pb-30 border-b-2">
        {
          projects.length > 0 ? projects.map((pro) => (
            <ProjectCard key={pro.id} id={pro.id} title={pro.title} tech_tags={pro.tech_tags} short_description={pro.short_description} icon={pro.icon}/>
          )) : <p className='text-center text-accent'>No Projects...</p>
        }
      </div>
    </>
  )
}

export default SelectedWorkSec